import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const create = (personObj) => {
    return new Promise((resolve, reject) => {
        if (!personObj) {
            console.log(`This is an error: null parameter`);
            reject(new Error("Person Object can not be null"));
            return;
        }
        return axios
            .post(baseURL, personObj)
            .then((response) => resolve(response.data));
    });
};

const update = (personObj) => {
    return new Promise((resolve, reject) => {
        if (!personObj) {
            console.log(
                `update operation - The argument personObj received is null`
            );
            reject(new Error(`Person Object can not be null`));
            return;
        }
        return axios
            .put(`${baseURL}/${personObj.id}`, personObj)
            .then((response) => resolve(response.data))
            .catch((error) => {
                console.log(`Update error received from API`);
                console.log(error);
                reject(error);
            });
    });
};

const getAll = () => {
    return axios.get(baseURL).then((response) => response.data);
};

const deletePerson = (idPerson) => {
    return new Promise((resolve, reject) => {
        if (!idPerson) {
            reject(new Error("idPerson can not be null"));
            return;
        }
        return axios
            .delete(`${baseURL}/${idPerson}`)
            .then((response) => {
                console.log(`Delete request API was successfully done`);
                console.log(response);
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.message);
                console.log(error.response.status);
                console.log(`---**---`);
                reject(error);
            });
    });
};

export default { create, getAll, deletePerson, update };
