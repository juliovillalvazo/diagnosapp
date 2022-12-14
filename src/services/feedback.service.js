import axios from 'axios';

class FeedBack {
    constructor() {
        this.api = axios.create({
            baseURL:
                process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
        });
    }

    postFeedback = async (body) => {
        return this.api.post('/api/send-feedback', body);
    };
}

const feedback = new FeedBack();

export default feedback;
