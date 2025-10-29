// This spec contains scenarios designed to testing some common variations in the language used to write test steps.
// The individual scenarios are not well-designed tests in themselves and don't follow a traditional Arrange-Act-Assert
// pattern but that was never the intention. These tests have been written in a way that allows a straightforward comparison
// of different ways of writing the same test steps to investigate how the `cy.prompt()` AI interprets them.

describe('example to-do app - language variations', () => {
  // These steps are all interepreted as cy.visit(' https://example.cypress.io/todo')
  // Note the protocol (https://) doesn't need to be specified explicitly but without it the URL is less obvious within the step text
  it('navigation', () => {
    cy.prompt([
      'visit https://example.cypress.io/todo',
      'navigate to https://example.cypress.io/todo',
      'open https://example.cypress.io/todo',
      'go to https://example.cypress.io/todo',
      'visit example.cypress.io/todo',
    ]);
  });

  // "type" and "enter" have the same meaning here - the latter doesn't automatically press enter after typing the text, that must be stated explicitly
  // "press" and "click" are equivalent for buttons
  // Actions such as "double-click" can be specified with or without the hyphen
  it('actions', () => {
    cy.prompt([
      'visit https://example.cypress.io/todo',
      'type "Feed the cat" in the new todo item field and press enter',
      'enter "Clean the kitchen" in the new todo item input',
      'click the "Completed" button',
      'press the "All" button',
      'double-click the "Pay electric bill" field',
      'double click the "Walk the dog" field',
      'right-click on the "GitHub" link',
      'right click on the "todos" title',
    ]);
  });

  // These steps are all exactly equivalent, all asserting against the text of the same element, demonstrating flexibility in the verbiage
  // (verify v confirm v assert), number formats (1st v first) and step syntax ("element has text" v "element is" v "element should have text")
  it('assertions', () => {
    cy.prompt([
      'visit https://example.cypress.io/todo',
      'verify the first todo item has text "Pay electric bill"',
      'confirm the first todo item has text "Pay electric bill"',
      'assert the first todo item has text "Pay electric bill"',
      'verify the 1st todo item has text "Pay electric bill"',
      'verify the first todo item has text Pay electric bill',
      'verify the first todo item is "Pay electric bill"',
      'the first todo item should have text "Pay electric bill"',
    ]);
  });

  // The first two prompt steps are interpreted correctly and behave as expected despite the lack of double quotes around the element text.
  // The final step passes but clicks the first button on the page (the Commands menu button) which may not be the desired action. This demonstrates
  // the need to verify the interpeted actions within the Cypress runner, although in most scenarios there would be further steps that would likely
  // assert something that would fail if the wrong action is taken and thus indicate an issue
  it('poorly written steps', () => {
    cy.visit('https://example.cypress.io/todo');
    cy.prompt([
      'press the All button',
      'double-click the Pay electric bill field',
      'click the button',
    ]);
  });

  // All these test steps are interpreted correctly and behave in exactly the same way as the earlier lower case equivalents i.e. steps are case insensitive
  it('case sensitivity', () => {
    cy.prompt([
      'VISIT https://example.cypress.io/todo',
      'cLiCk the "Completed" button',
      'click the "All" BUTTON',
      'verify THE 1st TODO item HAS TeXt "Pay electric bill"',
    ]);
  });
});
