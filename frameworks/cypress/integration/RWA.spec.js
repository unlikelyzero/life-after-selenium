describe('Can find existing user in RWA', () => {
  before(() => {
    //Navigate to RWA
    cy.visit('http://localhost:3000');
  });
    it.skip('should navigate to Cypress Web App and find Dev Becker', () => {
      
      //Check Title
      cy.title().should('eq', 'React App');

      //Enter Login info and click button
      cy.get('input[name="username"]').type('Katharina_Bernier');
      cy.get('input[name="password"]').type('s3cret');
      cy.get('button[type="submit"]').click();

      //Click new transaction button (Note the autowait)
      cy.get('a[href="/transaction/new"]').click();
      
      //Alias the network request we care about
      cy.server();
      cy.route('GET', '/users/search?q=Devon+Becker').as('devonSearch');

      //Search for Devon Becker
      cy.get('[data-test=user-list-search-input]').click().type('Devon Becker')
      
      //Wait for Network Request
      cy.wait('@devonSearch')
      
      cy.get('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').contains('Devon Becker')
    })

    it('Can Find a Mocked User and Intercept', () => {
      cy.title().should('eq', 'React App');

      cy.get('input[name="username"]').type('Katharina_Bernier');
      cy.get('input[name="password"]').type('s3cret');
      cy.get('button[type="submit"]').click();

      cy.get('a[href="/transaction/new"]').click();
      
      //Mock a new Network Response and alias
      cy.server({
        method: 'GET',
        status: 200,
        request: '/users/search?q=Devon+Becker',
        response: {"results":[{"id":"tsHF6_D5oQ","uuid":"53315353-7ca6-4cd1-8fd6-af9fb5a9dd25","firstName":"John","lastName":"Hill","username":"Jessyca.Kuhic","password":"$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW","email":"Jordy37@yahoo.com","phoneNumber":"277-189-3402","avatar":"https://sdtimes.com/wp-content/uploads/2018/07/lHYLxJV3_400x400.jpg","defaultPrivacyLevel":"contacts","balance":75369,"createdAt":"2020-02-11T21:26:46.510Z","modifiedAt":"2020-05-21T15:15:33.944Z"}]}
      })
      cy.route('GET', '/users/search?q=John+Hill').as('devonSearch');

      //Search for John Hill (a nonexistant User)
      cy.get('[data-test=user-list-search-input]').click().type('John Hill')
      cy.wait('@devonSearch')

      //Verify that John Hill is returned from RWA
      cy.get('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').contains('John Hill')

    })

 })