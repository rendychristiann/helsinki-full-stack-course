import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// const getAllAsync = async () => {
//   const response = await axios.get(baseUrl)
//   console.log(response.data, 'Ini response');
// //   return response.data
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
  const request =  axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request =  axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`) //string literal
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }