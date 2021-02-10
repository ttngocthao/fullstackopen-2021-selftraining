import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll =()=>{
    const req = axios.get(baseUrl)
    return req.then(res=>res.data)
}

const create =(newPersonObj)=>{
    const req = axios.post(baseUrl,newPersonObj)
    return req.then(res=>res.data)
}

const remove = (id)=>{
    const itemUrl = `${baseUrl}/${id}`
    const req = axios.delete(itemUrl)
    return req.then(res=>res.data)
}

const update = (id,newObj)=>{
    const itemUrl = `${baseUrl}/${id}`
    const req = axios.put(itemUrl,newObj)
    return req.then(res=>res.data)
}

export default {getAll,create,remove,update}