import axios from 'axios';

class Search {
    constructor() {
        this.api = axios.create({
            baseURL:
                process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
        });
    }

    getResult = async (query) => {
        return this.api.get(`/api/search/doctors?${query}`);
    };
}

const search = new Search();

export default search;
