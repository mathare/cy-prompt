/// <reference types="cypress" />

// This spec contains the same tests and same steps as `example.cy.ts` but rewritten as natural language prompt steps.
// Some steps have to be commented out due to what appears to be limitations with the `cy.prompt()` functionality.
// I have no idea why verifying the list length works in some tests but not in others - this verification seems quite flaky

describe('example to-do app - using cy.prompt()', () => {
  beforeEach(() => {
    cy.prompt([' visit https://example.cypress.io/todo']);
  });

  it('displays two todo items by default', () => {
    cy.prompt([
      'verify the todo list has 2 items',
      'verify the first todo item has text "Pay electric bill"',
      'verify the second todo item has text "Walk the dog"',
    ]);
  });

  it('can add new todo items', () => {
    cy.prompt([
      'Type "Feed the cat" in the new todo input and press enter',
      // 'verify the todo list has 3 items',
      'verify the last item has text "Feed the cat"',
    ]);
  });

  it('can check off an item as completed', () => {
    cy.prompt([
      'check the checkbox for the "Pay electric bill" todo item',
      'verify the "Pay electric bill" todo item has the "completed" class',
    ]);
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.prompt(['check the checkbox for the "Pay electric bill" todo item']);
    });

    it('can filter for uncompleted tasks', () => {
      cy.prompt([
        'click the "Active" button',
        'verify the todo list has 1 item',
        'and the todo item has text "Walk the dog"',
        // 'and there is no "Pay electric bill" todo item',
      ]);
    });

    it('can filter for completed tasks', () => {
      cy.prompt([
        'click the "Completed" button',
        'verify the todo list has 1 item',
        'and the todo item has text "Pay electric bill"',
        // 'and there is no "Walk the dog" todo item',
      ]);
    });

    it('can delete all completed tasks', () => {
      cy.prompt([
        'click the "Clear completed" button',
        // 'verify the todo list has 1 item',
        'and the todo item does not have text "Pay electric bill"',
        // 'and the "Clear completed" button is no longer displayed',
      ]);
    });
  });
});
