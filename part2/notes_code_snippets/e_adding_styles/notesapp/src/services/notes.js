import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
    const reqPromise = axios.get(baseUrl);
    const nonExistingNote = {
        id: 1000,
        content: "This note is not saved in the server",
        important: true,
    };
    return reqPromise.then((response) => response.data.concat(nonExistingNote));
};

const create = (newObject) => {
    const reqPromise = axios.post(baseUrl, newObject);
    return reqPromise.then((response) => response.data);
};

const update = (id, newObject) => {
    const reqPromise = axios.put(`${baseUrl}/${id}`, newObject);
    return reqPromise.then((response) => response.data);
};

export default { getAll, create, update };
