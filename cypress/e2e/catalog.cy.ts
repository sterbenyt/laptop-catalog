/// <reference types="cypress" />

describe('Каталог ноутбуків – e2e тести', () => {
    beforeEach(() => {
        cy.visit('/catalog');
    });

    it('Головна сторінка відкривається і відображає товари', () => {
        cy.get('[data-test="laptop-list"]').should('have.length.greaterThan', 0);
    });

    it('Перехід на сторінку товару працює', () => {
        cy.get('[data-test="product-card"]').first().click();
        cy.url().should('include', '/laptop/');
        cy.get('[data-test="product-title"]').should('exist');
    });

    it('Додає товар до кошика і відкриває модальне вікно', () => {
       cy.get('[data-test="add-to-cart-button"]').first().click();
       cy.get('[data-testid="cart-icon"]').click();
       cy.get('[data-testid="overlay"]').should('be.visible');
    });

    it('Видаляє товар з кошика', () => {
       cy.get('[data-test="add-to-cart-button"]').first().click();
       cy.get('[data-testid="cart-icon"]').click();
       cy.get('[data-test="remove-from-cart-button"]').click();
       cy.get('[data-test="cart-empty-message"]').should('exist');
    });

    it('Оформлення замовлення очищує кошик', () => {
        cy.get('[data-test="add-to-cart-button"]').first().click();
        cy.get('[data-testid="cart-icon"]').click();
        cy.get('[data-test="checkout-button"]').click();
        cy.get('[data-testid="cart-icon"]').click();
        cy.get('[data-test="cart-empty-message"]').should('exist');
    });

    it('Працює навігація в шапці: переходи між сторінками', () => {
       cy.get('[data-test="nav-about"]').click({ force: true });
       cy.url().should('include', '/about');
       cy.get('h1').should('contain', 'Про нас');

        cy.get('[data-test="nav-delivery"]').click({ force: true });
        cy.url().should('include', '/delivery');
        cy.get('h1').should('contain', 'Доставка та замовлення');

       cy.get('[data-test="nav-catalog"]').click({ force: true });
       cy.url().should('eq', `${Cypress.config().baseUrl}/catalog`);
    });

});

export {};