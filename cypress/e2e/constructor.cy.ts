import {
  TEST_BASE_URL,
  TEST_BUN_SELECTOR,
  TEST_CONSTRUCTOR_SELECTOR,
  TEST_INGR_DETAIL_HEADER,
  TEST_MAIN_SELECTOR,
  TEST_MODAL_SELECTOR,
  TEST_OVERLAY_SELECTOR,
  TEST_SAUCE_SELECTOR,
} from './testPropperties';

describe('Constructor test', () => {
  beforeEach((): void => {
    cy.visit(TEST_BASE_URL);
  });

  it('should show ingredient detail after click on element', () => {
    //close by click
    cy.get(`${TEST_BUN_SELECTOR}`).first().click();
    cy.get(`${TEST_MODAL_SELECTOR}`).should('contain.text', TEST_INGR_DETAIL_HEADER);
    cy.wait(2000);
    cy.get(`${TEST_OVERLAY_SELECTOR}`).click('topLeft');

    //close by esc
    cy.wait(2000);
    cy.get(`${TEST_MAIN_SELECTOR}`).first().click();
    cy.get(`${TEST_MODAL_SELECTOR}`).should('contain.text', TEST_INGR_DETAIL_HEADER);
    cy.wait(2000);
    cy.get('body').type('{esc}');

    //close by click on close icon
    cy.wait(2000);
    cy.get(`${TEST_SAUCE_SELECTOR}`).first().click();
    cy.get(`${TEST_MODAL_SELECTOR}`).should('contain.text', TEST_INGR_DETAIL_HEADER);
    cy.wait(2000);
    cy.get('*[class^="modal__modal__close"]').click();
  });

  it('should drag and drop ingredients to the constructor', () => {
    cy.wait(2000);
    cy.get(`${TEST_BUN_SELECTOR}`).eq(0).trigger('dragstart');
    cy.get(`${TEST_CONSTRUCTOR_SELECTOR}`).trigger('drop');
    cy.wait(2000);
    cy.get(`${TEST_SAUCE_SELECTOR}`).eq(1).trigger('dragstart');
    cy.get(`${TEST_CONSTRUCTOR_SELECTOR}`).trigger('drop');
    cy.wait(2000);
    cy.get(`${TEST_MAIN_SELECTOR}`).eq(2).trigger('dragstart');
    cy.get(`${TEST_CONSTRUCTOR_SELECTOR}`).trigger('drop');
  });
});
