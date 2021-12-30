import { Octokit, App } from "octokit";
import { strict as assert } from "assert";
import * as fs from "fs";

const database = "data.json";
const auth_file = "auth_token.txt";

const languages = ["C", "CPP", ["JavaScript", "TypeScript"], "Python", ["Java", "Kotlin"], "Go", "PHP", "C#", "Ruby", "Dart", "Swift"];

//const all_caps = /^[A-Z0-9]+$/;
const cases: [string, RegExp][] = [
	["lowercase", /^[a-z0-9\.]+$/],
	["Uppercase", /^[0-9\.]*[A-Z][a-z0-9\.]*$/],
	["lowerCamel", /^[0-9\.]*[a-z][a-z0-9\.]*([0-9\.]*[A-Z][a-z0-9\.]*)+$/],
	["UpperCamel", /^[0-9\.]*[A-Z][a-zA-Z0-9\.]*([0-9\.]*[A-Z][a-z0-9\.]*)+$/],
	["snake_case", /^[0-9\.]*([a-z][a-zA-Z0-9\.]*|(?=_))(_+([0-9\.]*[a-zA-Z][a-zA-Z0-9\.]*|[0-9\.]*))+$/],
	["Upper_Snake", /^[0-9\.]*([A-Z][a-zA-Z0-9\.]*|(?=_))(_+([0-9\.]*[a-zA-Z]+[a-zA-Z0-9\.]*|[0-9\.]*))+$/],
	["kebab-case", /^[0-9\.]*([a-z][a-zA-Z0-9\.]*|(?=-))(-+([0-9\.]*[a-zA-Z][a-zA-Z0-9\.]*|[0-9\.]*))+$/],
	["Upper-Kebab", /^[0-9\.]*([A-Z][a-zA-Z0-9\.]*|(?=-))(-+([0-9\.]*[a-zA-Z]+[a-zA-Z0-9\.]*|[0-9\.]*))+$/],
	["other", /^.*$/]
];

function get_lang_param(language: string | string[]) {
	if(typeof language == "string") {
		return `language:${language}`;
	} else {
		return language.map(l => `language:${l}`).join(" ");
	}
}

function language_list(language: string | string[]) {
	if(typeof language == "string") {
		return language;
	} else {
		return language.join(", ");
	}
}

function get_by_key(key: string) {
	for(let [k, re] of cases) {
		if(k == key) {
			return re;
		}
	}
	assert(false);
}

function print_tables(counts: {[key: string]: { [key: string]: number } }, keys: string[]) {
	let table: (string | number)[][] = [];
	table.push([""].concat(keys));
	for(let language of languages.concat(["totals"])) {
		let ll = language_list(language);
		let row: (string | number)[] = [];
		row.push(ll == "totals" ? "Totals" : ll.replace(", ", "/"));
		for(let key of keys) {
			row.push(counts[ll][key]);
		}
		table.push(row);
	}
	const th = .2; // highlight entries within 20% of max
	console.log(`| ${table[0].join(" | ")} |`);
	console.log(`| ${table[0].map(_ => "-").join(" | ")} |`);
	{
		for (let row of table.slice(1)) {
			let max = Math.max(...row.slice(1) as number[]);
			console.log(`| ${row[0]} | ${(row.slice(1) as number[])
			                              .map(e => e == max ? `**${e}**\\*\\*` :
			                                               (max - e) / max < th ? `**${e}**\\*` : e)
			                              .join(" | ")} |`);
		}
	}
	console.log();
	console.log(`| ${table[0].join(" | ")} |`);
	console.log(`| ${table[0].map(_ => "-").join(" | ")} |`);
	{
		for (let row of table.slice(1)) {
			let total = (row.slice(1) as number[]).reduce((x, a) => x + a);
			let max = Math.max(...row.slice(1) as number[]) / total;
			console.log(`| ${row[0]} | ${(row.slice(1) as number[])
			                              .map(e => e / total)
			                              .map(e => e == max ? `**${Math.round(e * 100)}%**\\*\\*` :
			                                               (max - e) / max < th ? `**${Math.round(e * 100)}%**\\*` :
			                                                  `${Math.round(e * 100)}%`)
			                              .join(" | ")} |`);
		}
	}
	console.log();
}

async function main() {
	let data: { [key: string]: { full_name: string, name: string, stars: number }[] } = {};
	if(fs.existsSync(database)) {
		data = JSON.parse(await fs.promises.readFile(database, { encoding: "utf-8" }));
	} else {
		const octokit = new Octokit({ auth: await fs.promises.readFile(auth_file, { encoding: "utf-8" }) });
		const response = await octokit.rest.users.getAuthenticated();
		console.log(`Logged in as ${response.data.login}`);
		for(let language of languages) {
			let ll = language_list(language);
			console.log(ll);
			data[ll] = [];
			for(let page = 1; page <= 10; page++) {
				let q = `stars:>100 ${get_lang_param(language)}`;
				console.log(page, q);
				let response = await octokit.rest.search.repos({
					q,
					sort: "stars",
					order: "desc",
					per_page: 100,
					page
				});
				assert(response.status == 200);
				let { data: search_data } = response;
				if(search_data.incomplete_results) {
					console.log("Warning: Incomplete results");
					page--; // try again
					continue;
				}
				for(let item of search_data.items) {
					data[ll].push({
						full_name: item.full_name,
						name: item.name,
						stars: item.stargazers_count
					});
				}
				if(search_data.items.length < 100) {
					break;
				}
			}
		}
		await fs.promises.writeFile(database, JSON.stringify(data, undefined, "\t"), { encoding: "utf-8" });
	}
	// quick sanity check
	///for(let [_, items] of Object.entries(data)) {
	///	for(let i = 1; i < items.length; i++) {
	///		console.log(items[i - 1].stars, items[i].stars);
	///		assert(items[i - 1].stars >= items[i].stars);
	///	}
	///}
	// todo: make sure no duplicates?
	// print by language and print an aggregate
	let counts: {[key: string]: { [key: string]: number } } = { totals: {} };
	let detected_cases: {[key: string]: string[] } = { };
	for(let [key, _] of cases) {
		counts.totals[key] = 0;
		detected_cases[key] = [];
	}
	for(let [language, items] of Object.entries(data)) {
		counts[language] = {};
		for(let [key, _] of cases) {
			counts[language][key] = 0;
		}
		for(let item of items) {
			let found = false;
			for(let [key, re] of cases) {
				if(found && key == "other") {
					continue;
				}
				if(re.test(item.name)) {
					if(key == "Upper-Kebab") {
						// something like foo-bar will be matched by Upper-Kebab because we need to
						// match things like How-to-XYZ
						// If this is really a lower kebab match, just continue
						if(get_by_key("kebab-case").test(item.name)) {
							console.log("Kebab warning:", item.full_name);
							continue;
						}
					}
					if(key == "Upper_Snake") {
						// something like test_123 will be matched by Upper-Snake and lower snake
						// If this is really a lower snake match, just continue
						if(get_by_key("snake_case").test(item.name)) {
							console.log("Snake warning:", item.full_name);
							continue;
						}
					}
					// sanity check: make sure not double counted
					if(found) {
						for(let [key, re] of cases) {
							if(re.test(item.name)) {
								console.log("->", key);
							}
						}
						assert(!found, `Repository: ${item.full_name}`);
					}
					found = true;
					counts[language][key]++;
					counts.totals[key]++;
					detected_cases[key].push(item.name);
				}
			}
			assert(found);
		}
	}
	console.log(detected_cases);
	console.log(counts);
	// print tables
	print_tables(counts, cases.map(e => e[0]));
	print_tables(counts, cases.filter(e => e[0] != "lowercase").map(e => e[0]));
}

main();
