describe('Can find existing user in RWA', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
    it('should navigate to Cypress Web App', () => {
      cy.title().should('eq', 'React App');

      cy.get('input[name="username"]').type('Katharina_Bernier');
      cy.get('input[name="password"]').type('s3cret');
      cy.get('button[type="submit"]').click();

      cy.get('a[href="/transaction/new"]').click();
      
      cy.server();
      cy.route('GET', '/users/search?q=Devon+Becker').as('devonSearch');

      cy.get('[data-test=user-list-search-input]').click().type('Devon Becker')
      cy.wait('@devonSearch')
      cy.get('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').contains('Devon Becker')
    })

 })