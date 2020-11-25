describe('Can find existing user in RWA', () => {
  before(() => {
    //Navigate to RWA
    cy.visit('http://localhost:3000');
  });
    it.only('should navigate to Cypress Web App and find Dev Becker', () => {
      
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

      cy.server({ enable: false })
    })

    it('Can Find a Mocked User and Intercept', () => {
      cy.title().should('eq', 'React App');

      cy.get('input[name="username"]').type('Katharina_Bernier');
      cy.get('input[name="password"]').type('s3cret');
      cy.get('button[type="submit"]').click();

      cy.get('a[href="/transaction/new"]').click();
      
      //Mock a new Network Response in totality from the server
      cy.server({
        method: 'GET',
        status: 200,
        request: '/users/search?q=Devon+Becker',
        response: {"results":[{"id":"tsHF6_D5oQ","uuid":"53315353-7ca6-4cd1-8fd6-af9fb5a9dd25","firstName":"John","lastName":"Hill","username":"Jessyca.Kuhic","password":"$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW","email":"Jordy37@yahoo.com","phoneNumber":"277-189-3402","avatar":"https://sdtimes.com/wp-content/uploads/2018/07/lHYLxJV3_400x400.jpg","defaultPrivacyLevel":"contacts","balance":75369,"createdAt":"2020-02-11T21:26:46.510Z","modifiedAt":"2020-05-21T15:15:33.944Z"}]}
      })
      //Alias any GET requests for John Hill sent from the browser
      cy.route('GET', '/users/search?q=John+Hill').as('johnSearch');

      //Search for John Hill (a nonexistant User)
      cy.get('[data-test=user-list-search-input]').click().type('John Hill')
      cy.wait('@johnSearch')

      //Verify that John Hill is returned from RWA
      cy.get('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').contains('John Hill')

      
      cy.server({ enable: false })

    })

    it('Can Find a Mocked User and Intercept', () => {
      cy.title().should('eq', 'React App');

      cy.get('input[name="username"]').type('Katharina_Bernier');
      cy.get('input[name="password"]').type('s3cret');
      cy.get('button[type="submit"]').click();

      cy.get('a[href="/transaction/new"]').click();
      cy.server()
      cy.route('GET', '/users/search?q=Devon+Becker').as('devonSearch');
      
      //Intercept a REAL network request and modify it on the wire
      cy.route2('/users/search?q=Devon+Becker', (req) => {
        req.reply((res) => {
        expect(res).to.exist
        console.log('original response from the server is %s %o', typeof res.body, res.body)
        const modified_body = JSON.parse(res.body)
        modified_body.results[0].firstName = "John"
        modified_body.results[0].lastName = "Hill"
        //modified_body.modified = "2020-11-09T18:22:12.223143Z"
        console.log('new response from the server is %s %o', typeof modified_body, modified_body)
        res.send(modified_body)
        })
      })

      //Search for John Hill (a nonexistant User)
      cy.get('[data-test=user-list-search-input]').click().type('Devon Becker')
      cy.wait('@devonSearch')

      //Verify that John Hill is returned from RWA
      cy.get('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').contains('John Hill')

      cy.server({ enable: false })
    })

 })