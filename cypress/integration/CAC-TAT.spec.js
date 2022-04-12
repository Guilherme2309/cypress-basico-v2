//// <reference types="cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function () {


        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Vargas')
        cy.get('#email').type('guilherme@gmail.com')
        // cy.get('#phone').type('945758585')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')


    })
    it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Vargas')
        cy.get('#email').type('guilherme@gmail,com')
        // cy.get('#phone').type('945758585')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('compo telefone continua vazio quando preenchido com valor não numerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')


    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatorio mais não é preenchido antes do envio do formulario', function () {
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Vargas')
        cy.get('#email').type('guilherme@gmail.com')
        // cy.get('#phone').type('945758585')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('guilherme')
            .should('have.value', 'guilherme')
            .clear()
        cy.get('#lastName')
            .type('Vargas')
            .should('have.value', 'Vargas')
            .clear()
        cy.get('#email')
            .type('guilhermevargas@gmail.com')
            .should('have.value', 'guilhermevargas@gmail.com')
            .clear()
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')

    })

    it('exibe mesagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('envia o formulario com sucesso usando comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')


    })
     
    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
        
    })

    it('seleciona um produto (Mebtiria)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })
    it('seleciona um produto(Blog) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })
   
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        

    })
    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
       cy.get('input[type=checkbox]')
       .check()
       .should('be.checked')
       .last()
       .uncheck()
       .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function(){
       cy.get('input[type="file"]')     
       .should('not.have.value')
       .selectFile('./cypress/fixtures/example.json')  
       .should(function($input){
           //console.log($input)
           expect($input[0].files[0].name).to.equal('example.json')
       })

        
    })

     it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')     
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})  
        .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
        })
 
     })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')     
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })
   it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
    
   })

})