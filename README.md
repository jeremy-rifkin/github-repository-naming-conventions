# Github Repository Naming Formats <!-- omit in toc -->

This is a survey of repositories at github, looking at naming formats used for github repository
names.

Table of contents:
- [Methodology](#methodology)
- [Results](#results)

## Methodology

Data: The GitHub search api is used to query the 1000 most starred repositories for each of the
following languages: C, CPP, JavaScript/TypeScript, Python, Java/Kotlin, Go, PHP, C#, Ruby, Dart,
and Swift. The names for these repositories are then matched against a set of regular expressions to
determine the name format.

There a few repositories named weirdly such as `L-ink_Card`, `Learning-OpenCV-3_examples`, etc.
which use mixed format names. These are categorized as "other".

There's a repository in the data named `--`, this is categorized as kebab case.

There are some other repositories that also use mixed format names such as `StarRuler2-Source` (a
combination of UpperCamel case and Upper-Kebab case). It could also make sense to categorize this as
"other" but for now it's categorized as Upper-Kebab.

## Results

|  | lowercase | Uppercase | ALLCAPS | camelCase | UpperCamel | snake_case | Upper_Snake | CAPS_SNAKE | kebab-case | Upper-Kebab | CAPS-KEBAB | other |
| - | - | - | - | - | - | - | - | - | - | - | - | - |
| C | **607**\*\* | 34 | 18 | 15 | 90 | 22 | 7 | 2 | 165 | 35 | 4 | 1 |
| CPP | **548**\*\* | 45 | 35 | 19 | 159 | 14 | 9 | 2 | 122 | 43 | 2 | 2 |
| JavaScript/TypeScript | **561**\*\* | 28 | 3 | 14 | 45 | 2 | 0 | 0 | 310 | 37 | 0 | 0 |
| Python | **528**\*\* | 29 | 12 | 18 | 94 | 26 | 6 | 0 | 226 | 57 | 2 | 2 |
| Java/Kotlin | **349**\*\* | 53 | 8 | 12 | 266 | 2 | 3 | 0 | 240 | 66 | 0 | 1 |
| Go | **766**\*\* | 11 | 0 | 1 | 20 | 9 | 1 | 0 | 179 | 12 | 0 | 1 |
| PHP | **445**\*\* | 55 | 10 | 6 | 97 | 9 | 3 | 1 | 323 | 48 | 3 | 0 |
| C# | 210 | 125 | 19 | 12 | **447**\*\* | 3 | 5 | 0 | 112 | 65 | 1 | 1 |
| Ruby | **573**\*\* | 7 | 1 | 1 | 20 | 118 | 1 | 0 | 271 | 7 | 0 | 1 |
| Dart | 221 | 11 | 3 | 4 | 77 | **414**\*\* | 12 | 0 | 175 | 82 | 0 | 1 |
| Swift | 55 | 235 | 5 | 14 | **502**\*\* | 3 | 2 | 0 | 124 | 60 | 0 | 0 |
| Totals | **4863**\*\* | 633 | 114 | 116 | 1817 | 622 | 49 | 5 | 2247 | 512 | 12 | 10 |

|  | lowercase | Uppercase | ALLCAPS | camelCase | UpperCamel | snake_case | Upper_Snake | CAPS_SNAKE | kebab-case | Upper-Kebab | CAPS-KEBAB | other |
| - | - | - | - | - | - | - | - | - | - | - | - | - |
| C | **61%**\*\* | 3% | 2% | 2% | 9% | 2% | 1% | 0% | 17% | 4% | 0% | 0% |
| CPP | **55%**\*\* | 5% | 4% | 2% | 16% | 1% | 1% | 0% | 12% | 4% | 0% | 0% |
| JavaScript/TypeScript | **56%**\*\* | 3% | 0% | 1% | 5% | 0% | 0% | 0% | 31% | 4% | 0% | 0% |
| Python | **53%**\*\* | 3% | 1% | 2% | 9% | 3% | 1% | 0% | 23% | 6% | 0% | 0% |
| Java/Kotlin | **35%**\*\* | 5% | 1% | 1% | 27% | 0% | 0% | 0% | 24% | 7% | 0% | 0% |
| Go | **77%**\*\* | 1% | 0% | 0% | 2% | 1% | 0% | 0% | 18% | 1% | 0% | 0% |
| PHP | **45%**\*\* | 6% | 1% | 1% | 10% | 1% | 0% | 0% | 32% | 5% | 0% | 0% |
| C# | 21% | 13% | 2% | 1% | **45%**\*\* | 0% | 1% | 0% | 11% | 7% | 0% | 0% |
| Ruby | **57%**\*\* | 1% | 0% | 0% | 2% | 12% | 0% | 0% | 27% | 1% | 0% | 0% |
| Dart | 22% | 1% | 0% | 0% | 8% | **41%**\*\* | 1% | 0% | 18% | 8% | 0% | 0% |
| Swift | 6% | 24% | 1% | 1% | **50%**\*\* | 0% | 0% | 0% | 12% | 6% | 0% | 0% |
| Totals | **44%**\*\* | 6% | 1% | 1% | 17% | 6% | 0% | 0% | 20% | 5% | 0% | 0% |

Most repositories, in all languages but C# and Dart, are named just lowercase (e.g.
`torvalds/linux`). But we're mostly interested in name formats for multi-word names. Filtering out
lowercase:

|  | camelCase | UpperCamel | snake_case | Upper_Snake | CAPS_SNAKE | kebab-case | Upper-Kebab | CAPS-KEBAB | other |
| - | - | - | - | - | - | - | - | - | - |
| C | 15 | 90 | 22 | 7 | 2 | **165**\*\* | 35 | 4 | 1 |
| CPP | 19 | **159**\*\* | 14 | 9 | 2 | 122 | 43 | 2 | 2 |
| JavaScript/TypeScript | 14 | 45 | 2 | 0 | 0 | **310**\*\* | 37 | 0 | 0 |
| Python | 18 | 94 | 26 | 6 | 0 | **226**\*\* | 57 | 2 | 2 |
| Java/Kotlin | 12 | **266**\*\* | 2 | 3 | 0 | **240**\* | 66 | 0 | 1 |
| Go | 1 | 20 | 9 | 1 | 0 | **179**\*\* | 12 | 0 | 1 |
| PHP | 6 | 97 | 9 | 3 | 1 | **323**\*\* | 48 | 3 | 0 |
| C# | 12 | **447**\*\* | 3 | 5 | 0 | 112 | 65 | 1 | 1 |
| Ruby | 1 | 20 | 118 | 1 | 0 | **271**\*\* | 7 | 0 | 1 |
| Dart | 4 | 77 | **414**\*\* | 12 | 0 | 175 | 82 | 0 | 1 |
| Swift | 14 | **502**\*\* | 3 | 2 | 0 | 124 | 60 | 0 | 0 |
| Totals | 116 | **1817**\* | 622 | 49 | 5 | **2247**\*\* | 512 | 12 | 10 |

|  | camelCase | UpperCamel | snake_case | Upper_Snake | CAPS_SNAKE | kebab-case | Upper-Kebab | CAPS-KEBAB | other |
| - | - | - | - | - | - | - | - | - | - |
| C | 4% | 26% | 6% | 2% | 1% | **48%**\*\* | 10% | 1% | 0% |
| CPP | 5% | **43%**\*\* | 4% | 2% | 1% | 33% | 12% | 1% | 1% |
| JavaScript/TypeScript | 3% | 11% | 0% | 0% | 0% | **76%**\*\* | 9% | 0% | 0% |
| Python | 4% | 22% | 6% | 1% | 0% | **52%**\*\* | 13% | 0% | 0% |
| Java/Kotlin | 2% | **45%**\*\* | 0% | 1% | 0% | **41%**\* | 11% | 0% | 0% |
| Go | 0% | 9% | 4% | 0% | 0% | **80%**\*\* | 5% | 0% | 0% |
| PHP | 1% | 20% | 2% | 1% | 0% | **66%**\*\* | 10% | 1% | 0% |
| C# | 2% | **69%**\*\* | 0% | 1% | 0% | 17% | 10% | 0% | 0% |
| Ruby | 0% | 5% | 28% | 0% | 0% | **65%**\*\* | 2% | 0% | 0% |
| Dart | 1% | 10% | **54%**\*\* | 2% | 0% | 23% | 11% | 0% | 0% |
| Swift | 2% | **71%**\*\* | 0% | 0% | 0% | 18% | 9% | 0% | 0% |
| Totals | 2% | **34%**\* | 12% | 1% | 0% | **42%**\*\* | 9% | 0% | 0% |

\*\* is the max, \* is up to 20% off of max
