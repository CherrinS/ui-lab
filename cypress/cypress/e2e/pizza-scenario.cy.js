
// QP-01 A custom pizza reaches the admin list
// Goal: check that a pizza request with restrictions gives a pizza
// that keeps them, that rating a pizza needs a login, and that the
// admin sees the new pizza.

function stamp() {
  const d = new Date()
  const two = (n) => String(n).padStart(2, '0')
  return d.getFullYear() + two(d.getMonth() + 1) + two(d.getDate()) +
    '-' + two(d.getHours()) + two(d.getMinutes()) + two(d.getSeconds())
}

describe('QP-01 A custom pizza reaches the admin list', () => {
  it('follows the steps of QP-01', () => {

    // Step 1: open QuickPizza
    cy.visit('https://quickpizza.grafana.com')
    cy.get('h1')
      .should('have.text', 'Looking to break out of your pizza routine?')

    // Step 2: turn on Advanced
    cy.contains('label', 'Advanced').click()
    cy.contains('label', 'Max Calories per Slice')
      .siblings('input')
      .should('be.visible')
    cy.get('select').should('be.visible')
    cy.get('#default-checkbox').should('be.visible')
    cy.get('input#pizza-name').should('be.visible')

    // Step 3: fill in the restrictions and the name
    const pizzaName = 'Lab Pizza ' + stamp()

    cy.contains('label', 'Max Calories per Slice')
      .siblings('input')
      .clear()
      .type('600')
      .should('have.value', '600')

    cy.get('select').select('Knife')
    cy.contains('option', 'Knife').should('be.selected')

    cy.get('#default-checkbox')
      .check()
      .should('be.checked')

    cy.get('input#pizza-name')
      .type(pizzaName)
      .should('have.value', pizzaName)

    // Step 4: ask for a pizza
    cy.intercept('POST', '/api/pizza').as('pizza')
    cy.get('button[name="pizza-please"]').click()
    cy.wait('@pizza')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get('@pizza').then(({ request, response }) => {
      // The request carries the limit from Step 3
      expect(request.body.maxCaloriesPerSlice).to.equal(600)

      const { pizza, calories } = response.body

      // The page shows the pizza that the server sent
      cy.contains('#recommendations p', 'Tool:')
        .should('have.text', 'Tool: ' + pizza.tool)

      cy.contains('#recommendations p', 'Calories per slice:')
        .should('have.text', 'Calories per slice: ' + calories)

      // Keep the tool for Step 7
      cy.wrap(pizza.tool).as('tool')
    })

    // Check the recommendation shown on the page
    cy.get('#recommendations')
      .should('contain', 'Name: ' + pizzaName)

    cy.contains('#recommendations p', 'Tool:')
      .should('not.contain', 'Knife')

    cy.contains('#recommendations p', 'Calories per slice:')
      .invoke('text')
      .then((text) => {
        const calories = Number(
          text.replace('Calories per slice:', '')
        )
        expect(calories).to.be.at.most(600)
      })
    cy.screenshot('qp01-step4-recommendation')

    // Step 5: rate the pizza without logging in
    cy.get('button[name="rate-5"]').click()
    cy.get('#rate-result')
      .should('have.text', 'Please log in first.')
    cy.screenshot('qp01-step5-login-needed')

    // Step 6: log in on the admin page
    cy.adminLogin('admin', 'admin')
    cy.contains('Latest pizza recommendations')
      .should('be.visible')

    // Step 7: find the new pizza in the admin list
    cy.get('@tool').then((tool) => {
      cy.contains('li', pizzaName)
        .should('contain', '(tool=' + tool + ',')
    })
    cy.screenshot('qp01-step7-admin-list')
  })
})
