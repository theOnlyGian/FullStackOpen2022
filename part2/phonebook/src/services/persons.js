import axios from 'axios'
const BASE_URL = 'http://localhost:3001/persons'

const getAllPersons = ()=>{
    const request = axios.get(BASE_URL) 
    return request.then((response) => response.data)
}

const updatePerson = (newPerson, id) =>{
    const request = axios.put(`${BASE_URL}/${id}`, newPerson)
    return request.then((response)=> response.data)
}

const createPerson = (newPerson) =>{
    const request = axios.post(`${BASE_URL}`, newPerson)
    return request.then((response)=> response.data)
}

const deletePerson = (id)=>{
    axios.delete(`${BASE_URL}/${id}`)
}

const persons = {
    update: updatePerson,
    create: createPerson,
    getAll: getAllPersons,
    delete: deletePerson
}
export default persons;