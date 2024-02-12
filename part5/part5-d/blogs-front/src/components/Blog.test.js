import react from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

let component
const removeBlog = jest.fn()
const updateLikes = jest.fn()

beforeEach(() => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'url',
    likes: 0,
    user: {}
  }

  component = render(
    <Blog blog={blog} removeBlog={removeBlog} updateLikes={updateLikes} />
  )
})

test('Verify blog component just shows author and title', () => {
  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')
  
  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

test('When click view button url and likes are showed', () => {
  const viewBtn = component.container.querySelector('.viewBtn')

  fireEvent.click(viewBtn)

  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')

  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()
})

test('When click like button two times', () => {
  const viewBtn = component.container.querySelector('.viewBtn')

  fireEvent.click(viewBtn)

  const likeBtn = component.container.querySelector('.likeBtn')

  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(updateLikes.mock.calls).toHaveLength(2)
})