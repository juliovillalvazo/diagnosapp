import axios from 'axios';

class Appointment {
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

    getAppointment = async (id) => {
        return this.api.get(`/api/appointments/${id}`);
    };

    createAppointment = async (id, body) => {
        return this.api.post(`/api/schedule/doctors/${id}`, body);
    };
}

const appointment = new Appointment();

export default appointment;
