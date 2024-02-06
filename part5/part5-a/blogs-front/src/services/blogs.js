import axios from "axios";
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
    headers: {Authorization: token}
  }

  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

export default {
  getAllBlogs,
  createBlog,
  setToken
}