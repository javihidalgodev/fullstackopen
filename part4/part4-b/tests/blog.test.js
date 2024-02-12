const helper = require('./blog_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Entry = require('../models/entry')

const api = supertest(app)

beforeEach(async ()=> {
  await Entry.deleteMany({})

  const entryObjects = helper.initialBlogs.map(entry => new Entry(entry))

  const promiseArray = entryObjects.map(entry => entry.save())
  await Promise.all(promiseArray)
})

describe('Viewing blogs...', () => {
  test('Get all blogs in DB', async () => {
    const entries = helper.initialBlogs
  
    const result = await api.get('/api/entries')
  
    expect(result.body).toHaveLength(entries.length)
  })
}) 

describe('Blog structure...', () => {
  test('ID is id not _id', async() =>{
    const entries = await Entry.find({})
  
    const formattedEntries = entries.map(e => JSON.parse(JSON.stringify(e)))
  
    formattedEntries.forEach(e => {
      expect(e.id).toBeDefined()
    })
  })

  test('New blog has "likes" property', async () => {
    const newBlog = {
      title: "‘True Detective: Noche polar’: ¿existe realmente Ennis, Alaska?",
      author: "Irene Crespo",
      url: "https://www.traveler.es/articulos/true-detective-noche-polar-donde-se-rodo#intcid=_cnt-es-right-rail_5c8b33c5-162a-433b-93e4-d351c157a849_popular4-1"
    }
  
    const result = await api.post('/api/entries').send(newBlog)
  
    expect(result.body.likes).toBe(0)
  })
})

describe('Adding blogs..', () => {
  test('Blog can be created', async () => {
    const newBlog = {
      title: "48 horas en la Provenza",
      author: "Sara Andrade",
      url: "https://www.traveler.es/articulos/guia-provenza-francia-que-ver?utm_source=pocket-newtab-es-es",
      likes: 12
    }
  
    await api
      .post('/api/entries')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const result = await helper.blogsInDB()
    const contents = result.map(r => r.title)
  
    expect(result).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(newBlog.title)
  
  })

  test('If blog is added with no title o url it will be not added', async () => {
    const newBlog = {
      author: "Irene Crespo",
      likes: 12
    }
  
    await api
    .post('/api/entries')
    .send(newBlog)
    .expect(400)
  })
})


describe('Deleting blog...', () => {
  test('Deleting blog with valid ID', async () => {
    const initialBlogs = await helper.blogsInDB()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/entries/${blogToDelete.id}`)
      .expect(204)
  })

  test('When blog does not exist', async () => {
    const id = '65ba1d37859605dbca8580f4'

    await api
      .delete(`/api/entries/${id}`)
      .expect(404)
    })
    
    test('When ID format is invalid', async () => {
      const id = '65ba1d37859605dbca'
      
      await api
      .delete(`/api/entries/${id}`)
      .expect(400)
  })
})

describe('Updating blogs...', () => {
  test('Updating likes', async () => {
    const initialBlogs = await helper.blogsInDB()
    const blogToUpdate = initialBlogs[0]

    const updatedBlog = {
      author: 'Mauricio',
      title: 'Mi casa. Hogar de suciedad.',
      url: 'https://www.noexisteurl.ya',
      likes: 12
    }

    const result = await api
      .put(`/api/entries/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const content = result.body
    expect(content.likes).toEqual(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})