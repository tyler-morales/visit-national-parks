describe('Nav links (laptop)', () => {
  it('should be displayed on laptop sizes on page load', () => {
    cy.visit('/')
    cy.get('nav').contains('Parks')
  })
})

describe('Nav links (mobile)', () => {
  it('should not be displayed on mobile sizes on page load', () => {
    cy.viewport(450, 750)
    cy.visit('/')
    cy.get('#parks').should('not.be.visible')
  })
})

describe('Nav links', () => {
  it('should not be visible when screen resizes from mobile to laptop and back to mobile if menu was left opened', () => {
    cy.get('#parks').should('be.visible')

    cy.viewport(450, 550)
    cy.get('#parks').should('not.be.visible')
    cy.get('#menu-icon').should('be.visible').click()
    cy.get('#parks').should('be.visible')
  })
})
