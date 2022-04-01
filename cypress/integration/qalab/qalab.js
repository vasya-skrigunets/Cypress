describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://qalab.pl.tivixlabs.com/')
    })

    it('Sucsessfuly serching on  selected days', () =>{
        cy.get('#country').select('Germainy')
        cy.get('#country').should('have.value', '2')

        cy.get('#city').select('Berlin')
        cy.get('#city').should('have.value', '3')
    
        cy.get('#model').type('Merzedess').should('have.value', 'Merzedess')
    
        cy.get('#pickup').click()
        cy.get('#pickup').type('2022-04-10')

        cy.get('#dropoff').click()
        cy.get('#dropoff').type('2022-04-17')
        cy.get('#search_form > .btn').click();
        cy.get('#search-results').should('exist');
    })

    it('Unsuccessfully searching with invalid data', () =>{
        cy.get('#country').select('Germainy')
        cy.get('#country').should('have.value', '2')

        cy.get('#city').select('Berlin')
        cy.get('#city').should('have.value', '3')
    
        cy.get('#model').type('non-existent car').should('have.value', 'non-existent car')
    
        cy.get('#pickup').click()
        cy.get('#pickup').type('2022-04-17')

        cy.get('#dropoff').click()
        cy.get('#dropoff').type('2022-04-10')
        cy.get('#search_form > .btn').click();
        cy.get('#search-results').should('not.exist');
        cy.get('.alert').should('have.text', 'Please enter a valid date!')
    })

    it.only('Unsuccessfully searching with invalid data', () =>{
        cy.get('#country').select('Germainy')
        cy.get('#country').should('have.value', '2')

        cy.get('#city').select('Berlin')
        cy.get('#city').should('have.value', '3')
        
        cy.get('#model').type('Merzedess').should('have.value', 'Merzedess')
    
        cy.get('#pickup').click()
        cy.get('#pickup').type('2022-04-10')

        cy.get('#dropoff').click()
        cy.get('#dropoff').type('2022-04-17')
        cy.get('#search_form > .btn').click();
        cy.get('#search-results').should('exist');
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
        cy.get('.btn').click();
        cy.url().then(url => {
            cy.intercept('POST' , url).as('resp')
        });
        cy.get('#name').type('Jhon').should('have.value', 'Jhon')
        cy.get('#last_name').type('Doi').should('have.value', 'Doi')
        cy.get('#card_number').type('4242424242424242').should('have.value', '4242424242424242')
        cy.get('#email').type('testmail@example.com').should('have.value', 'testmail@example.com')
        cy.get('.btn').click();
        
        cy.wait('@resp').its('response.statusCode').should('eq', 201)
    })
})
