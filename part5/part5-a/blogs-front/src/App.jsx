import { useEffect, useState } from 'react'
import login from './services/login'
import blogsServices from './services/blogs'
import Notification from './components/Notification'
import './index.css'

function App() {
  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})

  useEffect(async () => {
    const loggedUser = JSON.parse(localStorage.getItem('token'))

    if(loggedUser) {
      setUser(loggedUser)
      blogsServices.setToken(loggedUser.signToken)
      setBlogs(await blogsServices.getAllBlogs())
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

  const handleBlogCreation = async (e) => {
    e.preventDefault()

    const newBlogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    const res = await blogsServices.createBlog(newBlogObject)
    setBlogs(blogs.concat(res))
    setNewBlog({})
    setNotification({type: 'ok', message: 'Blog created successfully!'})

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const loginForm = () =>
  <div id='loginForm'>
    <h1>log in to application</h1>
    <form method='post' onSubmit={handleLogin}>
      <div>username <input type="text" name="Username" value={username} onChange={({target}) => setUsername(target.value)} /></div>
      <div>password <input type="text" name="Password" value={password} onChange={({target}) => setPassword(target.value)} /></div>
      <div><input type="submit" value="login" /></div>
    </form>
  </div>

  const saveBlogForm = () => 
    <div id='blogForm'>
      <form method='post' onSubmit={handleBlogCreation}>
        <div>
          title: <input type="text" name="BlogTitle" value={newBlog.title} onChange={({target}) => setNewBlog({...newBlog, title: target.value})} />
        </div>
        <div>
          author: <input type="text" name="BlogAuthor" value={newBlog.author} onChange={({target}) => setNewBlog({...newBlog, author: target.value})} />
        </div>
        <div>
          author: <input type="text" name="BlogURL" value={newBlog.url} onChange={({target}) => setNewBlog({...newBlog, url: target.value})} />
        </div>
        <input type="submit" value="save" />
      </form>
    </div>

  return (
    <>
      {
        notification !== '' && <Notification content={notification} />
      }

      {
        user === ''
          ? loginForm()
          : 
          <div className='blogs-container'>
            <h2>Blogs</h2>
            <h4>Welcome {user.username}</h4>
            <button onClick={handleLogout}>logout</button>
            {saveBlogForm()}
            {
              blogs.map(b => 
                <div className='entry'>
                  {b.author}, {b.title} 
                </div>
              )
            }
          </div>
      }
    </>
  )
}

export default App
