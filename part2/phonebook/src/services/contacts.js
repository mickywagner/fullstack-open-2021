import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data)
}

const create = (newContact) => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, create, }