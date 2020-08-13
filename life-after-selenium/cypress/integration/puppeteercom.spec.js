describe('RedHat Search Test', () => {
    it('Visit Redhat.com and Search for something', () => {

      cy.visit('https://developers.google.com/web/tools/puppeteer')
      cy.get('.devsite-search-field').click().type('puppeteer').type('{enter}')

      cy.get('.devsite-banner-message')
      cy.get('.devsite-search-title').contains('puppeteer')
      cy.get('.devsite-user-signin')
    })
  })