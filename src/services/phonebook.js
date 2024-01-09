import axios from 'axios'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const urlBase = '/api/persons'

const urlLogin = '/api/users/login'

const getAll = () => axios.get(urlBase)

const getOne = (id) => axios.get(`${urlBase}/${id}`)

const create = (personObject) =>
  axios.post(urlBase, personObject, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const remove = (id) => axios.delete(`${urlBase}/${id}`)

const update = (id, personObject) => axios.put(`${urlBase}/${id}`, personObject)

const login = (credentials) => {
  const response = axios.post(urlLogin, credentials)
  
  return response.data
}

const personService = { getAll, getOne, create, remove, update, login }

export default personService
