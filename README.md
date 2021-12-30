# Github Repository Naming Conventions <!-- omit in toc -->

This is a survey of repositories at github, looking at naming conventions used for github repository
names.

Table of contents:
- [Methodology](#methodology)
- [Results](#results)

## Methodology

Data: The GitHub search api is used to query the 1000 most starred repositories for each of the
following languages: C, CPP, JavaScript/TypeScript, Python, Java/Kotlin, Go, PHP, C#, Ruby, Dart,
and Swift. The names for these repositories are then matched against a set of regular expressions to
determine naming convention.

There a few repositories named weirdly such as `L-ink_Card`, `Learning-OpenCV-3_examples`, etc.
which use mixed naming convention names. These are categorized as "other".

There's a repository in the data named `--`, this is categorized as kebab case.

There are some other repositories that use mixed naming conventions such as `StarRuler2-Source` (a
combination of UpperCamel case and Upper-Kebab case). These are categorized aggressively for now,
this example is categorized as Upper-Kebab though it could also make sense to categorize it as
"other".

## Results

|  | lowercase | Uppercase | lowerCamel | UpperCamel | snake_case | Upper_Snake | kebab-case | Upper-Kebab | other |
| - | - | - | - | - | - | - | - | - | - |
| C | **607**\*\* | 34 | 15 | 108 | 22 | 9 | 166 | 38 | 1 |
| CPP | **548**\*\* | 45 | 19 | 194 | 14 | 11 | 122 | 45 | 2 |
| JavaScript/TypeScript | **561**\*\* | 28 | 14 | 48 | 2 | 0 | 312 | 35 | 0 |
| Python | **529**\*\* | 29 | 18 | 106 | 26 | 6 | 227 | 58 | 1 |
| Java/Kotlin | **349**\*\* | 53 | 12 | 274 | 2 | 3 | 241 | 66 | 0 |
| Go | **766**\*\* | 11 | 1 | 20 | 9 | 1 | 179 | 12 | 1 |
| PHP | **445**\*\* | 55 | 6 | 107 | 9 | 4 | 323 | 51 | 0 |
| C# | 210 | 125 | 12 | **466**\*\* | 3 | 5 | 112 | 66 | 1 |
| Ruby | **574**\*\* | 7 | 1 | 21 | 118 | 1 | 271 | 7 | 0 |
| Dart | 221 | 11 | 4 | 80 | **414**\*\* | 12 | 176 | 81 | 1 |
| Swift | 55 | 235 | 14 | **507**\*\* | 3 | 2 | 124 | 60 | 0 |
| Totals | **4865**\*\* | 633 | 116 | 1931 | 622 | 54 | 2253 | 519 | 7 |

|  | lowercase | Uppercase | lowerCamel | UpperCamel | snake_case | Upper_Snake | kebab-case | Upper-Kebab | other |
| - | - | - | - | - | - | - | - | - | - |
| C | **61%**\*\* | 3% | 2% | 11% | 2% | 1% | 17% | 4% | 0% |
| CPP | **55%**\*\* | 5% | 2% | 19% | 1% | 1% | 12% | 5% | 0% |
| JavaScript/TypeScript | **56%**\*\* | 3% | 1% | 5% | 0% | 0% | 31% | 4% | 0% |
| Python | **53%**\*\* | 3% | 2% | 11% | 3% | 1% | 23% | 6% | 0% |
| Java/Kotlin | **35%**\*\* | 5% | 1% | 27% | 0% | 0% | 24% | 7% | 0% |
| Go | **77%**\*\* | 1% | 0% | 2% | 1% | 0% | 18% | 1% | 0% |
| PHP | **45%**\*\* | 6% | 1% | 11% | 1% | 0% | 32% | 5% | 0% |
| C# | 21% | 13% | 1% | **47%**\*\* | 0% | 1% | 11% | 7% | 0% |
| Ruby | **57%**\*\* | 1% | 0% | 2% | 12% | 0% | 27% | 1% | 0% |
| Dart | 22% | 1% | 0% | 8% | **41%**\*\* | 1% | 18% | 8% | 0% |
| Swift | 6% | 24% | 1% | **51%**\*\* | 0% | 0% | 12% | 6% | 0% |
| Totals | **44%**\*\* | 6% | 1% | 18% | 6% | 0% | 20% | 5% | 0% |

Most repositories, in all languages but C# and Dart, are named just lowercase (e.g.
`torvalds/linux`). But we're mostly interested in naming conventions for multi-word names. Filtering
out lowercase:

|  | Uppercase | lowerCamel | UpperCamel | snake_case | Upper_Snake | kebab-case | Upper-Kebab | other |
| - | - | - | - | - | - | - | - | - |
| C | 34 | 15 | 108 | 22 | 9 | **166**\*\* | 38 | 1 |
| CPP | 45 | 19 | **194**\*\* | 14 | 11 | 122 | 45 | 2 |
| JavaScript/TypeScript | 28 | 14 | 48 | 2 | 0 | **312**\*\* | 35 | 0 |
| Python | 29 | 18 | 106 | 26 | 6 | **227**\*\* | 58 | 1 |
| Java/Kotlin | 53 | 12 | **274**\*\* | 2 | 3 | **241**\* | 66 | 0 |
| Go | 11 | 1 | 20 | 9 | 1 | **179**\*\* | 12 | 1 |
| PHP | 55 | 6 | 107 | 9 | 4 | **323**\*\* | 51 | 0 |
| C# | 125 | 12 | **466**\*\* | 3 | 5 | 112 | 66 | 1 |
| Ruby | 7 | 1 | 21 | 118 | 1 | **271**\*\* | 7 | 0 |
| Dart | 11 | 4 | 80 | **414**\*\* | 12 | 176 | 81 | 1 |
| Swift | 235 | 14 | **507**\*\* | 3 | 2 | 124 | 60 | 0 |
| Totals | 633 | 116 | **1931**\* | 622 | 54 | **2253**\*\* | 519 | 7 |

|  | Uppercase | lowerCamel | UpperCamel | snake_case | Upper_Snake | kebab-case | Upper-Kebab | other |
| - | - | - | - | - | - | - | - | - |
| C | 9% | 4% | 27% | 6% | 2% | **42%**\*\* | 10% | 0% |
| CPP | 10% | 4% | **43%**\*\* | 3% | 2% | 27% | 10% | 0% |
| JavaScript/TypeScript | 6% | 3% | 11% | 0% | 0% | **71%**\*\* | 8% | 0% |
| Python | 6% | 4% | 23% | 6% | 1% | **48%**\*\* | 12% | 0% |
| Java/Kotlin | 8% | 2% | **42%**\*\* | 0% | 0% | **37%**\* | 10% | 0% |
| Go | 5% | 0% | 9% | 4% | 0% | **76%**\*\* | 5% | 0% |
| PHP | 10% | 1% | 19% | 2% | 1% | **58%**\*\* | 9% | 0% |
| C# | 16% | 2% | **59%**\*\* | 0% | 1% | 14% | 8% | 0% |
| Ruby | 2% | 0% | 5% | 28% | 0% | **64%**\*\* | 2% | 0% |
| Dart | 1% | 1% | 10% | **53%**\*\* | 2% | 23% | 10% | 0% |
| Swift | 25% | 1% | **54%**\*\* | 0% | 0% | 13% | 6% | 0% |
| Totals | 10% | 2% | **31%**\* | 10% | 1% | **37%**\*\* | 8% | 0% |

\*\* is the max, \* is up to 20% off of max
