
describe("Testing our volunteer form", function () {
        beforeEach(function() {
            cy.visit("http://localhost:3000/")
        })
        it("Add tests to inputs and submit form", function () {
            cy.get('input[name="name"]')
                .type("Tanner")
                .should("have.value", "Tanner")
            cy.get('input[name="password"]')
                .type("Password123")
                .should("have.value", "Password123")
            cy.get('input[name="email"]')
                .type("email@email.com")
                .should("have.value", "email@email.com")
            cy.get('input[type="checkbox"]')
                .check()
                .should('have.value', 'on')
            cy.get('form')
                .submit()
            
            
        })
        it('check validation message on invalid input', () => {
            cy.get('input:invalid').should('have.length', 0)
            cy.get('[type="email"]').type('not_an_email')
            cy.get("[data-cy=emailError]").should("be.visible")
            cy.get('input:invalid').should('have.length', 1)
            
            cy.get('input[name="password"]')
            .type("password").clear()
            cy.get("[data-cy=pwdError]").should("be.visible")

            cy.get('input[name="name"]').type("Tanner Williams").clear()
            cy.get("[data-cy=nameError]").should("be.visible")
        })
        


})