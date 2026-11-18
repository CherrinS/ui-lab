# UI lab results
Tool parts that I chose:
- Part 1: Selenium IDE
- Part 4 : Cypress

## Part 0
- Step 0.1, Chrome version:148.0.7778.168
- Step 0.3, ChromeDriver version:148.0.7778.168
- Step 0.4, locator of Pizza, Please!:name=pizza-please
- Step 0.4, locator of Excluded tools:css=select
- Step 0.4, locator of Must be vegetarian:id=default-checkbox
- Step 0.4, locator of Custom Pizza Name: css=input#pizza-name
- Step 0.5, pizza name, tool and calories of the run by hand: Lab Pizza 20261115-212804, Scissors, 425 calories per slice

| Step | Actual result | Pass or fail |
|---|---|---|
| 1 | Heading reads "Looking to break out of your pizza routine?" | Pass |
| 2 | Advanced fields appeared | Pass |
| 3 | 600, Knife, vegetarian, `Lab Pizza 20261115-212804` | Pass |
| 4 | Name correct, Tool = Scissors, Calories = 425 | Pass |
| 5 | Please log in first. | Pass |
| 6 | Admin login succeeded and the page shows "Latest pizza recommendations". | Pass |
| 7 | Lab Pizza 20261115-212804 appears in the admin list with tool=Scissors. | Pass |

## Part 1: Selenium IDE
- Firefox version and Node.js version: Firefox 160.0, Node.js 26.3.0, npm 11.16.0
- Step 1.4, the line of the failed check and the line Tests: `Actual value 'Received!' did not match 'Received'`; `Tests: 1 failed, 1 total`
- Step 1.5, target chosen for Submit, and why the recorded one was fragile: `xpath=//button[@type='submit']`; the recorded `css=.btn` was fragile because other elements may share the same class.
- Step 1.6, commands changed, added or deleted after recording: Changed the recorded commands to use the locators and waits from the lab; added the automatic pizza-name script and echo, field checks, answer checks and the login-required check; deleted unnecessary recorder-generated commands.
- Step 1.6, the pizza names of run 1 and run 2, from the lines info: echo: Lab Pizza 20261115-235136; Lab Pizza 20261115-235212
- Step 1.6, the line Tests: of both runs: Run 1 — `Tests: 2 passed, 2 total`; Run 2 — `Tests: 2 passed, 2 total`
- Step 1.7, one line of QP01customerTest.java that needs rewriting, and why: The line that types "600" into Max Calories per Slice needs a clear() before sendKeys(), because the page already contains 1000 and sendKeys("600") would produce 1000600.

## Part 4: Cypress

- node --version, npm --version and npx cypress version: Node.js 26.3.0, npm 11.16.0, Cypress 16.2.1
- Step 4.3, failure message for the wrong title: `Timed out retrying after 10000ms`; expected `Web Form` but actual was `Web form`.
- Step 4.6, tool and calories in the answer of POST /api/pizza:
- Step 4.7, the line of the admin list that shows your pizza:
- Step 4.8, run 1, result, duration and pizza name:
- Step 4.8, run 2, result, duration and pizza name:
- Step 4.9 (optional), browser and result:

## Part B

1.