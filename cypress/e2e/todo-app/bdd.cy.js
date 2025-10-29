/// <reference types="cypress" />

// This spec is based on the `prompts.cy.ts` spec and has the same tests but written in a Gherkin-style format to test BDD support.
// Fragile assertions (such as verifying the list length) have been omitted for simplicity.
// This spec also includes some scenarios designed to test the limits of the Gherkin interpreter.

describe('example to-do app - using Gherkin-style prompts', () => {
  beforeEach(() => {
    cy.prompt(['Given I have opened https://example.cypress.io/todo']);
  });

  it('displays two todo items by default', () => {
    cy.prompt([
      'Then the first todo item is "Pay electric bill"',
      'And the second todo item is "Walk the dog"',
    ]);
  });

  it('can add new todo items', () => {
    cy.prompt([
      'When I type "Feed the cat" in the new todo input and press enter',
      'Then the last item is "Feed the cat"',
    ]);
  });

  it.only('can check off an item as completed', () => {
    cy.prompt([
      'When I check the checkbox for the "Pay electric bill" todo item',
      'Then the "Pay electric bill" todo item has the "completed" class',
      'But the "Walk the dog" todo item does not have the "completed" class',
    ]);
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.prompt([
        'Given I have checked the checkbox for the "Pay electric bill" todo item',
      ]);
    });

    it('can filter for uncompleted tasks', () => {
      cy.prompt([
        'When I click the "Active" button',
        'Then the todo item is "Walk the dog"',
      ]);
    });

    it('can filter for completed tasks', () => {
      cy.prompt([
        'When I click the "Completed" button',
        'Then the todo item is "Pay electric bill"',
      ]);
    });

    it('can delete all completed tasks', () => {
      cy.prompt([
        'When I click the "Clear completed" button',
        'Then the todo item is not "Pay electric bill"',
      ]);
    });
  });
});

// Rather surprisingly all these scenarios are interpreted to the exact same Cypress commands (other than slight variations in selectors).
// I was expecting the order of the BDD keywords to be unimportant (as it is in most Gherkin implementations) but being able to replace
// Given-When-Then with Assuming-Once-Thus without affecting the test is quite remarkable. Note that Assuming-Once-Thus is not a known
// BDD pattern, I literally picked some synonyms for the regular BDD verbs to see how `cy.prompt()` would cope with it. Arrange-act-assert
// is a known test pattern but I have never seen it used in BDD-style steps before so I wasn't expecting `cy.prompt()` to interpret these
// steps as smoothly as it did.
describe('poorly written BDD', () => {
  it('keywords out of order', () => {
    cy.prompt([
      'When I open https://example.cypress.io/todo',
      'Then I check the checkbox for the "Pay electric bill" todo item',
      'Given the "Pay electric bill" todo item has the "completed" class',
    ]);
  });

  it('invalid keywords', () => {
    cy.prompt([
      'Assuming I open https://example.cypress.io/todo',
      'Once I check the checkbox for the "Pay electric bill" todo item',
      'Thus the "Pay electric bill" todo item has the "completed" class',
    ]);
  });

  it('arrange-act-assert', () => {
    cy.prompt([
      'Arrange: I open https://example.cypress.io/todo',
      'Act: I check the checkbox for the "Pay electric bill" todo item',
      'Assert: the "Pay electric bill" todo item has the "completed" class',
    ]);
  });
});
