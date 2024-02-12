// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function({ username, password }) {
  cy.request({
    method: 'POST',
    body: {username, password},
    url: `${Cypress.env('BACKEND')}/login`
  }).then(res => {
    localStorage.setItem('token', JSON.stringify(res.body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', function(blog) {
  cy.request({
    method: 'POST',
    headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('token')).signToken}`},
    body: blog,
    url: 'http://localhost:2024/api/blogs'
  })
  cy.visit('')
})