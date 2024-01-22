import axios from "axios"
const baseURL = 'http://localhost:3000/persons'

const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(res => res.data)
}

const addPerson = (person) => {
  const req = axios.post(baseURL, person)
  return req.then(res => res.data)
}

const updatePerson = (id, person) => {
  const req = axios.put(`${baseURL}/${id}`, person)
  return req.then(res => res.data)
}

const deleteP = (id) => {
  const req = axios.delete(`${baseURL}/${id}`)
  return req.then(res => res.data)
}

export default {
  getAll,
  addPerson,
  updatePerson,
  deleteP
}