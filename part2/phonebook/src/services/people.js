import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const create = (personObj) => {
    return new Promise((resolve, reject) => {
        if (!personObj) {
            console.log(`This is an error`);
            reject(new Error("Person Object can not be null"));
            return;
        }
        return axios
            .post(baseURL, personObj)
            .then((response) => resolve(response.data));
    });
};

const getAll = () => {
    return axios.get(baseURL).then((response) => response.data);
};

export default { create, getAll };
