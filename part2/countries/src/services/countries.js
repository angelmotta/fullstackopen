import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
    return axios
        .get(`${baseURL}/all`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(`something went wrong fetching data from API`);
            console.log(err);
            return err;
        });
};

export default {
    getAll,
};
