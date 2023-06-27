describe('Login', () => {
  it('should display error while logging in', () => {
    cy.visit('https://social-speed-cubing.netlify.app/login')
    cy.get("#email").type("example_email@wp.pl")
    cy.get("#password").type("haslo123")
    cy.get("button[type='submit']").click()
    cy.get(".login__submit-message").contains("Błędne dane logowania")
  })

  it('should redirect user to profile page', () => {
    cy.visit('https://social-speed-cubing.netlify.app/login')
    cy.get("#email").type("mati-biz@wp.pl")
    cy.get("#password").type("kaktus123")
    cy.get("button[type='submit']").click()
    cy.location('pathname').should('include', 'profile')
  })
})