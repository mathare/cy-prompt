/// <reference types="cypress" />

// This is the example `todo.cy.js` spec file that is automatically created when running Cypress for the first time.
// It uses a simple todo list app as the application under test. This spec file will be the baseline for experimenting
// with `cy.prompt()`, a natural language processing feature added to Cypress in v15.4.0 (October 2025).
// NB Other than adding this comment and deleting the auto-generated comments this spec file is unchanged from the original.

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2);

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
  });

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem);
  });

  it('can check off an item as completed', () => {
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check();

    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed');
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');

      cy.contains('Pay electric bill').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill');

      cy.contains('Walk the dog').should('not.exist');
    });

    it('can delete all completed tasks', () => {
      cy.contains('Clear completed').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill');

      cy.contains('Clear completed').should('not.exist');
    });
  });
});
