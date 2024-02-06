import { useEffect, useState, useRef } from 'react'
import login from './services/login'
import blogsServices from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggable from './components/Togglable'
import './index.css'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

function App() {
  const [notification, setNotification] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const blogFormRef = useRef()

  useEffect(async () => {
    const loggedUser = JSON.parse(localStorage.getItem('token'))

    if(loggedUser) {
      setUser(loggedUser)
      blogsServices.setToken(loggedUser.signToken)
      const resBlogs = await blogsServices.getAllBlogs()
      setBlogs(resBlogs.sort((a, b) => b.likes - a.likes))
      //añadir token para las notas
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log('login with ', username, password)

    try {
      const user = await login({username, password})

      localStorage.setItem('token', JSON.stringify(user))

      blogsServices.setToken(user.signToken)
      setUser(user)
      setBlogs(await blogsServices.getAllBlogs())
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({type: 'error', message: 'Wrong credentials'})

      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser('')
    setBlogs([])
  }

  const addBlog = async newBlogObject => {
    blogFormRef.current.toggleVisibility()

    const res = await blogsServices.createBlog(newBlogObject)
    setBlogs(blogs.concat(res).sort((a, b) => b.likes - a.likes))

    setNotification({type: 'ok', message: 'Blog created successfully!'})

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const updateBlogLikes = async blog => {
    await blogsServices.updateBlogLikes(blog)
    const resBlogs = await blogsServices.getAllBlogs()
    setBlogs(resBlogs.sort((a, b) => b.likes - a.likes))
  }
  
  const removeBlog = async blogToRemove => {
    const confirmation = window.confirm('Are you sure?')

    confirmation &&
      await blogsServices.removeBlog(blogToRemove)
      setBlogs(await blogsServices.getAllBlogs())
  }

  const loginForm = () => 
    <Toggable label='login'>
      <LoginForm
        handleLogin={handleLogin}
        handleChangeUsername={({target}) => setUsername(target.value)}
        handleChangePassword={({target}) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </Toggable>

  const saveBlogForm = () => 
    <Toggable label='create blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Toggable>

  return (
    <>
      <h1>Blogs Application</h1>
      {
        notification !== '' && <Notification content={notification} />
      }

      {
        user === ''
          ? loginForm()
          : 
          <div className='blogs-container'>
            <div>
              <span>Welcome {user.username}</span>
              <button onClick={handleLogout}>logout</button>
            </div>
            {saveBlogForm()}
            {
              blogs.map(b =>
                <Blog key={b.id} blog={b} updateLikes={updateBlogLikes} removeBlog={removeBlog} />
              )
            }
          </div>
      }
    </>
  )
}

export default App
