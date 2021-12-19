describe('Login Tests', () => {
  it('Successfull Login', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('tets@gmail.com')
    cy.get('[data-cy=password]').type('qwerty123')
    cy.get('[data-cy=submit-login]').click()
    cy.location('pathname').should('include', '/')
  })

  it('Empty fields', () => {
    cy.visit('/login')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=email-error').should('have.text', '🚨 Cannot be empty')
    cy.get('[data-cy=password-error').should('have.text', '🚨 Cannot be empty')
  })

  it('User does not exist', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('demo@gmail.com')
    cy.get('[data-cy=password]').type('qwerty123')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=login-server-error').should(
      'have.text',
      'User does not exist.'
    )
  })

  it('Incorrect email/ password', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('tets@gmail.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=login-server-error').should(
      'have.text',
      'Incorrect username or password.'
    )
  })
})
