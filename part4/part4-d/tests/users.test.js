const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const password = await bcrypt.hash('rootpassword', 10)
  const rootUser = new User({
    username: 'root',
    password
  })
  
  const demouserpassword = await bcrypt.hash('demouserpassword', 10)
  const demoUser = new User({
    username: 'demouser',
    name: 'John Doe',
    password: demouserpassword
  })

  await rootUser.save()
  await demoUser.save()
})

describe('Creating users...', () => {
  test('OK', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'jhidalgodev',
      name: 'Javi Hidalgo',
      password: 'lapassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const lastUser = usersAtEnd[usersAtEnd.length - 1]
    expect(lastUser.username).toBe(newUser.username)
  })

  test('user without username or password fails and return properly statuscode', async () => {
    const wrongUser = {
      name: 'Wrong User',
      password: 'wronguserpassword'
    }

    await api
      .post('/api/users')
      .send(wrongUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    delete wrongUser.password
    wrongUser.username = 'wronguser'

    await api
    .post('/api/users')
    .send(wrongUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
  
  test('username and password should be at least 3 characters', async () => {
    const wrongUser = {
      username: 'wronguser',
      name: 'Wrong User',
      password: 'wr'
    }

    await api
    .post('/api/users')
    .send(wrongUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    wrongUser.password = 'wronguserpasswor'
    wrongUser.username = 'wr'
    
    await api
    .post('/api/users')
    .send(wrongUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
})

describe('Viewing users...', () => {
  test('obtain all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})