import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/phonebook'

// const getAllAsync = async () => {
//   const response = await axios.get(baseUrl)
//   console.log(response.data, 'Ini response');
// //   return response.data
// }

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data);
}

const create = async (newObject) => {
  const request =  axios.post(baseUrl, newObject)
  return request.then((response) => response.data);
}

const update = async (id, newObject) => {
  const request =  axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data);
}

const remove = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`) //string literal
    return request.then((response) => response.data);
}

export default { getAll, create, update, remove }