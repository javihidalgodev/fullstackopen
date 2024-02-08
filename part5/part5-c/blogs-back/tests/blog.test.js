const helper = require('./blog_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async ()=> {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Viewing blogs...', () => {
  test('Get all blogs in DB', async () => {
    const blogs = helper.initialBlogs
  
    const result = await api.get('/api/blogs')
  
    expect(result.body).toHaveLength(blogs.length)
  })
}) 

describe('Blog structure...', () => {
  test('ID is id not _id', async() =>{
    const blogs = await Blog.find({})
  
    const formattedBlogs = blogs.map(e => JSON.parse(JSON.stringify(e)))
  
    formattedBlogs.forEach(e => {
      expect(e.id).toBeDefined()
    })
  })

  test('New blog has "likes" property', async () => {
    const newBlog = {
      title: "‘True Detective: Noche polar’: ¿existe realmente Ennis, Alaska?",
      author: "Irene Crespo",
      url: "https://www.traveler.es/articulos/true-detective-noche-polar-donde-se-rodo#intcid=_cnt-es-right-rail_5c8b33c5-162a-433b-93e4-d351c157a849_popular4-1"
    }
  
    const result = await api.post('/api/blogs').send(newBlog)
    console.log(result)
    expect(result.body.likes).toBe(0)
  })
})

describe('Adding blogs...', () => {
  test('Blog can be created', async () => {
    const newBlog = {
      title: "48 horas en la Provenza",
      author: "Sara Andrade",
      url: "https://www.traveler.es/articulos/guia-provenza-francia-que-ver?utm_source=pocket-newtab-es-es",
      likes: 12,
      user: "demouser"
    }
  
    await api
      .post('/api/blogs')
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
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })
})


describe('Deleting blog...', () => {
  test('Deleting blog with valid ID', async () => {
    const initialBlogs = await helper.blogsInDB()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })

  test('When blog does not exist', async () => {
    const id = '65ba1d37859605dbca8580f4'

    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
    })
    
    test('When ID format is invalid', async () => {
      const id = '65ba1d37859605dbca'
      
      await api
      .delete(`/api/blogs/${id}`)
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
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const content = result.body
    expect(content.likes).toEqual(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})