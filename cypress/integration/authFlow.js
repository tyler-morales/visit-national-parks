describe('Login Tests', () => {
  it('Empty fields', () => {
    cy.visit('/login')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=email-error').should('have.text', '🚨 Cannot be empty')
    cy.get('[data-cy=password-error').should('have.text', '🚨 Cannot be empty')
  })

  it('User does not exist', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('blah@gmail.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=login-server-error').should(
      'have.text',
      'User does not exist.'
    )
  })

  it('Incorrect email/ password', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('moratyle@gmail.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit-login]').click()
    cy.get('[data-cy=login-server-error').should(
      'have.text',
      'Incorrect username or password.'
    )
  })

  it('Successfull Login', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('moratyle@gmail.com')
    cy.get('[data-cy=password]').type('qwerty123')
    cy.get('[data-cy=submit-login]').click()
    // Redirect to home page
    cy.location('pathname').should('include', '/')
  })
})
