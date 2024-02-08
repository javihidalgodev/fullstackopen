import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const createBlog = (e) => {
    e.preventDefault()

    const newBlogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    addBlog(newBlogObject)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div id='blogForm'>
      <form
        method='post'
        onSubmit={createBlog}
      >
        <div>
        title:
          <input
            type="text"
            name="BlogTitle"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div>
        author:
          <input
            type="text"
            name="BlogAuthor"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div>
        url:
          <input
            type="text"
            name="BlogURL"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <input
          type="submit"
          value="save blog" />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm