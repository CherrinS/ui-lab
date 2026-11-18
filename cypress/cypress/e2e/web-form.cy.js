describe('Web form', () => {
  it('fills in the fields and sends the form', () => {
    cy.visit('https://www.selenium.dev/selenium/web/web-form.html')
    cy.title().should('eq', 'Web form')
  })
})