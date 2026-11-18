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
- Step 4.6, tool and calories in the answer of POST /api/pizza: Pizza cutter, 550
- Step 4.7, the line of the admin list that shows your pizza: Lab Pizza 20261119-011106 (tool=Scissors, ingredients_number=5)
- Step 4.8, run 1, result, duration and pizza name: 2 tests passed, duration 11 seconds, pizza name: Lab Pizza
- Step 4.8, run 2, result, duration and pizza name: 2 tests passed, duration 12 seconds, pizza name: Lab Pizza 20261119-011106

## Part B

### 1. Explain why the tests locate Max Calories per Slice through its label instead of its id. Propose a change to the page that would let a test use an id, and state why that change helps a tester.

The tests locate Max Calories per Slice through its label because the three number boxes share the same id, so using the id alone would not identify the correct box. The label text identifies the specific field and its input. A better page design would give the Max Calories input its own unique id, such as `max-calories`. This would make the locator shorter, clearer, and more stable for testers.

### 2. Step 7 of QP-01 compares the tool in the admin list with the tool in the recommendation. Identify the kind of test oracle that this check is, and describe one fault in QuickPizza that it would catch.

The check in Step 7 is a consistency test oracle because it compares two representations of the same expected result: the tool in the recommendation and the tool shown in the admin list. It could catch a fault where QuickPizza creates or stores a pizza with one tool but later displays a different tool in the admin list. In our Cypress test, the tool from the API response is saved and then compared with the tool in the admin list.

### 3. QP-01 never checks that the pizza is vegetarian. Propose a check that would, and state what the test would need from the page or from another source.

QP-01 could check that the recommended pizza is vegetarian by checking a vegetarian value returned by the API or an equivalent indication on the page. For example, the test could verify that the API response contains `vegetarian: true`. The test would therefore need the page to expose the vegetarian result or the API response to provide a reliable vegetarian field.

### 4. Compare the two tools that you used. Describe how each one waited for QuickPizza, how quickly you could write QP-01 with it, and how readable its report, log or video was.

Selenium IDE and Cypress both wait for elements and checks instead of using fixed pauses. Selenium IDE uses commands such as `wait for element visible`, while Cypress automatically retries queries and assertions for up to the configured 10 seconds. Cypress was straightforward to extend into the QP-01 test, and its terminal report clearly showed the passing tests, duration, screenshots, and videos. Selenium IDE was useful for recording and editing commands, while Cypress gave more direct control over the test code and evidence.

### 5. Choose the tool that you would use for the automated UI tests of Project 2, and justify the choice with two reasons from this lab.

I would choose Cypress for the automated UI tests of Project 2. First, its commands automatically wait and retry, so the tests do not need many explicit waits. Second, it provides clear test results together with screenshots and videos, which makes failures and full-run evidence easier to inspect.

### 6. For Part 1, explain why the target that the recorder chose for the Submit button is fragile, and why the target that replaced it is more stable.

In Selenium IDE, the recorder originally chose `css=.btn` for the Submit button. This target is fragile because other buttons can also use the same class, so the test could click the wrong element if the page changes. We replaced it with `xpath=//button[@type='submit']`, which identifies the Submit button by its type and is more specific and stable.

### 7. For Part 4, explain why QP-01 has to be a single test in Cypress, which clears the cookies before each test, and what would go wrong if steps 6 and 7 were a second test.

In Cypress, QP-01 has to remain a single test because Cypress clears cookies before each test. Steps 6 and 7 need the same browser session as steps 1–5 so that the pizza created earlier can be found on the same QuickPizza server after login. If steps 6 and 7 were placed in a separate test, the cookies could be cleared and the admin list could be associated with a different session or server, causing the test to fail to find the pizza.