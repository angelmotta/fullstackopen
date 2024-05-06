import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
    const reqPromise = axios.get(baseUrl);
    return reqPromise.then((response) => response.data);
};

const create = (newObject) => {
    const reqPromise = axios.post(baseUrl, newObject);
    return reqPromise.then((response) => response.data);
};

const update = (id, newObject) => {
    const reqPromise = axios.put(`${baseUrl}/${id}`, newObject);
    return reqPromise.then((response) => response.data);
};

export default {
    getAll: getAll,
    create: create,
    update: update,
};
