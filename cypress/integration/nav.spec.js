describe('Render Nav links', () => {
  it('should be displayed on laptop sizes on page load', () => {
    cy.visit('/')
    cy.get('[data-cy=parks]').contains('Parks')
  })

  it('should not be displayed on mobile sizes on page load', () => {
    cy.viewport(450, 750)
    cy.visit('/')
    cy.get('[data-cy=parks]').should('not.be.visible')
  })
})

describe('Nav links', () => {
  it('should not be visible when screen resizes from mobile to laptop and back to mobile if menu was left opened', () => {
    cy.visit('/')
    cy.get('[data-cy=parks]').should('be.visible')

    cy.viewport(450, 550)
    cy.get('[data-cy=parks]').should('not.be.visible')
    cy.get('[data-cy=hamburger-icon]').should('be.visible').click()
    cy.get('[data-cy=parks]').should('be.visible')
  })
})

describe('Focus nav links', () => {
  it('should be focusable on tabs', () => {
    cy.visit('/')
    cy.get('nav a').each(($el, index, $list) => {
      cy.wrap($el).focus()
    })
  })
})

describe('Navigate to About page', () => {
  it('click on about page and go back to home', () => {
    cy.visit('/')
    cy.get('[data-cy=about-page]').click()
    cy.go('back')
    cy.get('[data-cy=about-page]').contains('About')
  })
})
