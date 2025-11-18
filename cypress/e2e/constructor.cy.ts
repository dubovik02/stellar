describe('Constructor test', () => {
  before((): void => {
    cy.visit('http://localhost:5173');
  });

  it('should show ingredient detail after click on 1st element', () => {
    //close by click
    cy.get('[data-card-test="bun"]').first().click();
    cy.get('[data-card-test="modal"]').should('contain.text', 'Детали ингридиента');
    cy.wait(2000);
    cy.get('[data-card-test="overlay"]').click('topLeft');

    //close by esc
    cy.wait(2000);
    cy.get('[data-card-test="main"]').first().click();
    cy.get('[data-card-test="modal"]').should('contain.text', 'Детали ингридиента');
    cy.wait(2000);
    cy.get('body').type('{esc}');

    //close by click on close icon
    cy.wait(2000);
    cy.get('[data-card-test="sauce"]').first().click();
    cy.get('[data-card-test="modal"]').should('contain.text', 'Детали ингридиента');
    cy.wait(2000);
    cy.get('*[class^="modal__modal__close"]').click();

    //drag'n'drop ingredients
    cy.get('[data-card-test="bun"]').eq(0).trigger('dragstart');
    cy.get('[data-card-test="constructor"]').trigger('drop');
    cy.wait(2000);
    cy.get('[data-card-test="sauce"]').eq(1).trigger('dragstart');
    cy.get('[data-card-test="constructor"]').trigger('drop');
    cy.wait(2000);
    cy.get('[data-card-test="main"]').eq(2).trigger('dragstart');
    cy.get('[data-card-test="constructor"]').trigger('drop');
  });

  // it('should drag and drop ingredients to the constructor', () => {
  //   cy.get('[data-card-test="bun"]').eq(0).trigger('dragstart');
  //   cy.get('[data-card-test="constructor"]').trigger('drop');

  //   cy.get('[data-card-test="sauce"]').trigger('dragstart');
  //   cy.get('[data-card-test="constructor"]').trigger('drop');

  //   cy.get('[data-card-test="main"]').trigger('dragstart');
  //   cy.get('[data-card-test="constructor"]').trigger('drop');
  // });

  // it('should create order', () => {
  //   cy.contains('заказ').click();
  //   cy.wait(20000);
  //   cy.get('[data-card-test="modal"]').should('contain.text', 'заказ');
  //   cy.wait(3000);
  //   cy.get('[data-card-test="overlay"]').click('topLeft');
  // });

  // it('should constructor has cleared', () => {
  //   cy.get('[data-card-test="constructor"]').children().should('have.length', 2);
  // });
});
