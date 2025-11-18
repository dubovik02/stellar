describe('Is avaliable', (): void => {
  it('should be available on localhost:5173', () => {
    cy.visit('http://localhost:5173');
  });
});
