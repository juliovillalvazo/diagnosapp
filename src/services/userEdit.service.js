import axios from 'axios';

class UserEdit {
    constructor() {
        this.api = axios.create({
            baseURL:
                process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
        });

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    // POST /api/examples
    createOne = async (requestBody) => {
        return this.api.post('/api/examples', requestBody);
    };

    // GET /api/examples
    getAll = async () => {
        return this.api.get('/api/examples');
    };

    // GET /api/examples/:id
    getOne = async (id, type) => {
        if (type === 'doctor') {
            return this.api.get(`/auth/doctors/${id}`);
        }
        return this.api.get(`/auth/patients/${id}`);
    };

    // PUT /api/examples/:id
    updateOne = async (id, requestBody) => {
        return this.api.put(`/auth/users/${id}/edit`, requestBody);
    };

    uploadImg = async (id, profilePicture) => {
        return this.api.post(`/auth/upload/${id}`, profilePicture);
    };

    // DELETE /api/examples/:id
    deleteProject = async (id) => {
        return this.api.delete(`/api/examples/${id}`);
    };
}

// Create one instance of the service
const userService = new UserEdit();

export default userService;
