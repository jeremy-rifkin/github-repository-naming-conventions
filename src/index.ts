import { Octokit, App } from "octokit";
import { strict as assert } from "assert";
import * as fs from "fs";

const database = "data.json";
const auth_file = "auth_token.txt";

const languages = [ "C", "CPP", ["JavaScript", "TypeScript"], "Python", ["Java", "Kotlin"], "Go",
                    "PHP", "C#", "Ruby", "Dart", "Swift" ];

const formats: [string, RegExp][] = [
	["lowercase", /^[0-9\.]*[a-z][a-z0-9\.]*$/],
	["Uppercase", /^[0-9\.]*[A-Z][a-z0-9\.]*$/],
	["ALLCAPS", /^[0-9\.]*[A-Z][A-Z0-9\.]*$/],
	["camelCase", /^[0-9\.]*[a-z][a-z0-9\.]*([A-Z][a-z0-9\.]*)+$/],
	["UpperCamel", /^[0-9\.]*[A-Z][a-z0-9\.]*([A-Z][a-z0-9\.]*)+$/],
	// Lower/upper snake/kebab are distinguished by the first character
	// Motivation: tiny-AES-c should be recognized as kebab-case, How-to-XYZ should be recognized as Upper-Kebab
	// I don't know what to do about weirdness like foo-Bar-Baz, for now I will just assume it doesn't happen :)
	// ([0-9\.]+_)?
	["snake_case", /^([0-9\.]*[a-z][a-zA-Z0-9\.]*(_[a-zA-Z0-9\.]*)+|[0-9\.]*_[0-9\.]*[a-z][a-zA-Z0-9\.]*(_[a-zA-Z0-9\.]*)*)$/],
	["Upper_Snake", /^([0-9\.]*[A-Z][a-zA-Z0-9\.]*(_[a-zA-Z0-9\.]*)+|[0-9\.]*_[0-9\.]*[A-Z][a-zA-Z0-9\.]*(_[a-zA-Z0-9\.]*)*)$/],
	["CAPS_SNAKE", /^([0-9\.]*[A-Z][A-Z0-9\.]*(_[A-Z0-9\.]*)+|[0-9\.]*_[0-9\.]*[A-Z][A-Z0-9\.]*(_[A-Z0-9\.]*)*)$/],
	["kebab-case", /^([0-9\.]*[a-z][a-zA-Z0-9\.]*(-[a-zA-Z0-9\.]*)+|[0-9\.]*-[0-9\.]*[a-z][a-zA-Z0-9\.]*(-[a-zA-Z0-9\.]*)*)$/],
	["Upper-Kebab", /^([0-9\.]*[A-Z][a-zA-Z0-9\.]*(-[a-zA-Z0-9\.]*)+|[0-9\.]*-[0-9\.]*[A-Z][a-zA-Z0-9\.]*(-[a-zA-Z0-9\.]*)*)$/],
	["CAPS-KEBAB", /^([0-9\.]*[A-Z][A-Z0-9\.]*(-[A-ZA-Z0-9\.]*)+|[0-9\.]*-[0-9\.]*[A-Z][A-Z0-9\.]*(-[A-ZA-Z0-9\.]*)*)$/],
	["other", /^.*$/]
];

// There are some collisions here
// C or C123 will be matched by Uppercase and ALLCAPS
// DOOM will be matched by ALLCAPS and UpperCamel
// Same situations arise for CAPS_SNAKE and CAPS-KEBAB

const overrides: { [key: string]: string } = {
	// Read as ALLCAPS < Uppercase
	"ALLCAPS": "Uppercase",
	"UpperCamel": "ALLCAPS",
	"Upper_Snake": "CAPS_SNAKE",
	"Upper-Kebab": "CAPS-KEBAB"
};

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

function get_format(key: string) {
	for(let [k, re] of formats) {
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
		// If data already collected, read
		data = JSON.parse(await fs.promises.readFile(database, { encoding: "utf-8" }));
	} else {
		// If data not already collected, collect it
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
	// note: there could be duplicates in the data, not really concerned with them as they would be very rare
	let counts: {[key: string]: { [key: string]: number } } = { totals: {} };
	let detected_cases: {[key: string]: string[] } = { };
	for(let [key, _] of formats) {
		counts.totals[key] = 0;
		detected_cases[key] = [];
	}
	for(let [language, items] of Object.entries(data)) {
		counts[language] = {};
		for(let [key, _] of formats) {
			counts[language][key] = 0;
		}
		for(let item of items) {
			let found = false;
			for(let [key, re] of formats) {
				if(found && key == "other") {
					continue;
				}
				if(re.test(item.name)) {
					if(key in overrides) {
						if(get_format(overrides[key]).test(item.name)) {
							console.log(`Override warning: ${overrides[key]} > ${key}: ${item.full_name}`);
							continue;
						}
					}
					// sanity check: make sure not double counted
					if(found) {
						for(let [key, re] of formats) {
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
	console.dir(detected_cases, {
		maxArrayLength: null
	});
	console.dir(counts);
	console.log();
	// print tables
	print_tables(counts, formats.map(e => e[0]));
	print_tables(counts, formats
	                       .filter(e => ["lowercase", "Uppercase", "ALLCAPS"].indexOf(e[0]) == -1)
	                       .map(e => e[0]));
}

main();
