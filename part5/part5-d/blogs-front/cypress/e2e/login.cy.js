beforeEach(function () {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/testing/reset`
  })

  const batman = {
    username: 'batman',
    name: 'Bruce Wayner',
    password: 'robin'
  }
  const robin = {
    username: 'robin',
    name: 'Dick Grayson',
    password: 'batman'
  }
  
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/users`,
    body: batman
  })
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/users`,
    body: robin
  })
  
  cy.visit('')
  // cy.login({username: "batman", password: "robin"})
})

it('login form can be showed', () => {
  cy.visit('')

  cy.contains('login').click()
  cy.get('input[name=Username]').type('batman')
  cy.get('input[name=Password]').type('robin')
  cy.get('input[value=login]').click()
})

describe('Login...', function () {

  it('correct login', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.get('html').contains('Welcome batman')
  })
  
  it('wrong credentials', function () {
    cy.contains('login').click()
    cy.get('input[name=Username]').type('batman')
    cy.get('input[name=Password]').type('robin2')
    cy.get('input[value=login]').click()

    cy.get('.notification').contains('Wrong credentials')
  })

})

describe('When log in...', function () {

  it('a blogform can be opened', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.contains('create blog').click()
    cy.get('html').contains('save blog')
  })
  
  it('a blong can be created', function() {
    cy.login({username: 'batman', password: 'robin'})
    cy.createBlog({
      author: 'J. K. Rowling',
      title: 'El Señor de los Anillos',
      url: 'https://www.google.com'
    })
    cy.get('html').contains('El Señor de los Anillos')
  })
  
  it('user can like a blog', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.createBlog({
      author: 'J. K. Rowling',
      title: 'El Señor de los Anillos',
      url: 'https://www.google.com'
    })
    cy.contains('view').click()
    cy.contains('like').click()
    cy.get('.likes').should('contain.text', 1)
  })
  
  it('correct user can delete a blog', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.createBlog({
      author: 'J. K. Rowling',
      title: 'El Señor de los Anillos',
      url: 'https://www.google.com'
    })
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.get('html').should('not.contain', 'El Señor de los Anillos')
  })
  
  it('incorrect user can\'t delete a blog', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.createBlog({
      author: 'J. K. Rowling',
      title: 'El Señor de los Anillos',
      url: 'https://www.google.com'
    })
    cy.get('#log-out-btn').click()
    cy.login({username: 'robin', password: 'batman'})
    cy.contains('view').click()
    cy.get('.blog').should('not.contain', 'remove')
  })
  
  it('blog are ', function () {
    cy.login({username: 'batman', password: 'robin'})
    cy.createBlog({
      author: 'J. R. R. Tolkien',
      title: 'El Señor de los Anillos',
      url: 'https://www.google.com',
      likes: 34
    })
    cy.createBlog({
      author: 'J. K. Rowling',
      title: 'Harry Potter',
      url: 'https://www.google.com',
      likes: 2
    })
    cy.get('#log-out-btn').click()
    cy.login({username: 'robin', password: 'batman'})
    cy.createBlog({
      author: 'Yo, robot',
      title: 'Isaac Asimov',
      url: 'https://www.google.com',
      likes: 35
    })

    cy.get('.blog').eq(0).should('contain', 'Yo, robot')
    cy.get('.blog').eq(1).should('contain', 'El Señor de los Anillos')
    cy.get('.blog').eq(1).contains('view').click()
    cy.get('.blog').eq(1).contains('like').click()
    cy.get('.blog').eq(0).should('contain', 'El Señor de los Anillos')
  })
})