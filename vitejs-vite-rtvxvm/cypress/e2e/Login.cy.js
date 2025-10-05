const valipassword = "9fxIH0GXesEwH_I";
const validemail = "erdem.guntay@wit.com.tr";

describe('Login Form', ()=>{

    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    });
    it ('success sayfasını açabiliyorum.', () => {
        cy.get('[name="email"]').type(validemail)
        cy.get('[name="password"]').type(valipassword)
        cy.get('[name="terms"]').click()

        cy.contains("Sign In").should('be.enabled').click()

        cy.get('[data-testid="location-display"]').should('have.text',"/main")
    })

    it('when password is empty sing in button should be disabled', () => {
        cy.get('[name="email"]').type(validemail)
        cy.get('[name="terms"]').click()

        cy.contains("Sign In").should('be.disabled')
    })

    it('when email is empty sing in button should be disabled', () => {
        cy.get('[name="terms"]').click()
        cy.get('[name="password"]').type(valipassword)

        cy.contains("Sign In").should('be.disabled')
    })
})
//deneme
//commit 2
//commit 3


