import axios from 'axios';

class Reviews {
    constructor() {
        this.api = axios.create({
            baseURL:
                process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
        });

        // Automatically set JWT token on the request headers for every request
        this.api.interceptors.request.use((config) => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    deleteReview = async (id, idReview) => {
        return this.api.get(
            `/api/search/doctors/${id}/review/${idReview}/delete`
        );
    };

    createReview = async (id, body) => {
        return this.api.post(`/api/search/doctors/${id}/review`, body);
    };
}

const review = new Reviews();

export default review;
