import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [blogDetails, setBlogDetails] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))

  return (
    <div className='blog'>
      <div>
        {blog.title}, {blog.author}
        <button onClick={() => setBlogDetails(!blogDetails)}>{blogDetails ? 'hide' : 'view'}</button>
      </div>
      {
        blogDetails &&
          <div className="blog-details">
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <button onClick={() => updateLikes(blog)}>like</button>
            </p>
            <p>{blog.user.username}</p>
            {
              token.username === blog.user.username &&
                <button onClick={() => removeBlog(blog)}>remove</button>
            }
          </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog