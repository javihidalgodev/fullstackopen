import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, blog, config)
  return res.data
}


const updateBlogLikes = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  const res = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
  return res.data
}

const removeBlog = async blogToRemove => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${blogToRemove.id}`, config)
  console.log(res)
}

export default {
  getAllBlogs,
  createBlog,
  updateBlogLikes,
  removeBlog,
  setToken
}