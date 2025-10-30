/// <reference types="cypress" />

// This spec contains the automatically-generated code for each scenario in the `prompts.cy.ts` spec.
// The code is exactly as output by Cypress except for some personal linting preferences e.g. single quotes.
// Note the original prompt command is kept as a comment before the generated code. The spacing between
// prompt strings is added automatically and I am not a fan of it but I have left it there to illustrate
// the quality of the generated code.

describe('example to-do app - generated code', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  // The list length assertion is very poor, in my opinion. It doesn't assert the to list has 2 elements, just
  // that there is at least 1 child element with the `li` tag.
  it('displays two todo items by default', () => {
    // cy.prompt([

    //   'verify the todo list has 2 items',

    //   'verify the first todo item has text "Pay electric bill"',

    //   'verify the second todo item has text "Walk the dog"',

    // ])
    // Prompt step 1: verify the todo list has 2 items
    cy.get('ul.todo-list').should('have.descendants', 'li');

    // Prompt step 2: verify the first todo item has text "Pay electric bill"
    cy.get('ul.todo-list li:nth-child(1)').should(
      'have.text',
      'Pay electric bill'
    );

    // Prompt step 3: verify the second todo item has text "Walk the dog"
    cy.get('ul.todo-list li:nth-child(2)').should('have.text', 'Walk the dog');
  });

  // Note the `data-id` selector used in the final assertion. This attribute is a dynamic value so this
  // test fails on subsequent runs
  it('can add new todo items', () => {
    // cy.prompt([

    //   'Type "Feed the cat" in the new todo input and press enter',

    //   // 'verify the todo list has 3 items',

    //   'verify the last item has text "Feed the cat"',

    // ])
    // Prompt step 1: Type "Feed the cat" in the new todo input and press enter
    cy.get('[data-test="new-todo"]').type('Feed the cat{enter}');

    // Prompt step 2: verify the last item has text "Feed the cat"
    cy.get('li[data-id="1761748971630"]').should('have.text', 'Feed the cat');
  });

  // Again, the last assertion uses a sub-optimal selector. The step selects an element based on the
  // same class that we are asserting is present. The item text passed to the prompt step was ignored
  // when it could have been used in a `cy.contains()` command to get the target element. Alternatively,
  // the interpreter could have used the same initial selector as the previous command ('li:nth-child(1)')
  it('can check off an item as completed', () => {
    // cy.prompt([

    //   'check the checkbox for the "Pay electric bill" todo item',

    //   'verify the "Pay electric bill" todo item has the "completed" class',

    // ])
    // Prompt step 1: check the checkbox for the "Pay electric bill" todo item
    cy.get('li:nth-child(1) input.toggle').check();

    // Prompt step 2: verify the "Pay electric bill" todo item has the "completed" class
    cy.get('li.completed').should('have.class', 'completed');
  });

  context('with a checked task', () => {
    beforeEach(() => {
      // cy.prompt(['check the checkbox for the "Pay electric bill" todo item'])
      // Prompt step 1: check the checkbox for the "Pay electric bill" todo item
      cy.get('li:nth-child(1) input.toggle').check();
    });

    it('can filter for uncompleted tasks', () => {
      // cy.prompt([

      //   'click the "Active" button',

      //   'verify the todo list has 1 item',

      //   'and the todo item has text "Walk the dog"',

      //   // 'and there is no "Pay electric bill" todo item',

      // ])
      // Prompt step 1: click the "Active" button
      cy.get('a[href="#/active"]').click();

      // Prompt step 2: verify the todo list has 1 item
      cy.get('ul.todo-list').should('have.descendants', 'li');

      // Prompt step 3: and the todo item has text "Walk the dog"
      cy.get('li[data-id="1761749128998"]').should('have.text', 'Walk the dog');
    });

    it('can filter for completed tasks', () => {
      // cy.prompt([

      //   'click the "Completed" button',

      //   'verify the todo list has 1 item',

      //   'and the todo item has text "Pay electric bill"',

      //   // 'and there is no "Walk the dog" todo item',

      // ])
      // Prompt step 1: click the "Completed" button
      cy.get('a[href="#/completed"]').click();

      // Prompt step 2: verify the todo list has 1 item
      cy.get('ul.todo-list').should('have.descendants', 'li');

      // Prompt step 3: and the todo item has text "Pay electric bill"
      cy.get('li.completed').should('have.text', 'Pay electric bill');
    });

    it('can delete all completed tasks', () => {
      // cy.prompt([

      //   'click the "Clear completed" button',

      //   // 'verify the todo list has 1 item',

      //   'and the todo item does not have text "Pay electric bill"',

      //   // 'and the "Clear completed" button is no longer displayed',

      // ])
      // Prompt step 1: click the "Clear completed" button
      cy.get('button.clear-completed').click();

      // Prompt step 2: and the todo item does not have text "Pay electric bill"
      cy.get('ul.todo-list').should('not.have.text', 'Pay electric bill');
    });
  });
});
