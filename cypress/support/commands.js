Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('Vargas')
    cy.get('#email').type('guilherme@gmail.com')
    // cy.get('#phone').type('945758585')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
  


})