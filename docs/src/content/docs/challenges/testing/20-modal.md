---
title: 🟠 Modal
description: Challenge 20 is about testing modals
sidebar:
  order: 111
---

<div class="chip">Challenge #20</div>

## Information:

In this small application, you have an input prompting you to enter a name, and a **Confirm** button to submit your form.
If you enter a name, a confirmation modal will appear; otherwise an error modal will be displayed.
In the confirmation modal, if you click the **Confirm** button, a message confirming the submission of the form will appear. If the user clicks on **Cancel**, an error message will be displayed.

The goal of this challenge is to test the dialogs inside your application. To do so, we will test the full application like an end-to-end test will do. This means, we will test the `AppComponent` as a black box and react to events on the page. <b>No internal details should be tested</b>. The difference between an e2e test and integration test is that we will mock all API calls. _(All http requests are faked inside this application, but this would not be the case in a real entreprice application.)_

You can play with it by running : `npx nx serve testing-modal`.

The file named `app.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-modal`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-modal` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application describe inside each test files using Testing library and Cypress Component Testing.

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::

---

:::note
Start the project by running: `npx nx serve testing-modal`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:20</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3Aanswer"
    alt="Modal community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3A"answer+author"'
    alt="Modal solution author">
    ▶︎ Author Answer
  </a>
  </div>
