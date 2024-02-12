import react from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Call function with correct details', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const titleInput = component.container.querySelector('input[name=BlogTitle]')
  const authorInput = component.container.querySelector('input[name=BlogAuthor]')
  const urlInput = component.container.querySelector('input[name=BlogURL]')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'Yo, robot' } })
  fireEvent.change(authorInput, { target: { value: 'Isaac Asimov' } })
  fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Yo, robot',
    author: 'Isaac Asimov',
    url: 'https://www.google.com'
  })
})