import styles from './LoginPage.module.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Input, Select } from 'antd';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    MailOutlined,
} from '@ant-design/icons';
import authService from '../../services/auth.service';

import Button from '../../components/UI/Button/Button';

const { Option } = Select;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [type, setType] = useState('patient');

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, type };

        // Send a request to the server using axios
        /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

        // Or using a service
        authService
            .login(requestBody)
            .then((response) => {
                // If the POST request is successful store the authentication token,
                // after the token is stored authenticate the user
                // and at last navigate to the home page
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/profile');
            })
            .catch((error) => {
                // If the request resolves with an error, set the error message in the state
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className={styles.LoginPage}>
            <form className={styles.form} onSubmit={handleLoginSubmit}>
                <h1>Login</h1>
                <label>Email:</label>

                <Input
                    type='email'
                    name='email'
                    value={email}
                    placeholder='enter your email'
                    onChange={handleEmail}
                    prefix={<MailOutlined />}
                />

                <label>Password:</label>

                <Input.Password
                    name='password'
                    value={password}
                    onChange={handlePassword}
                    placeholder='input password'
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                />

                <label>Choose a login type:</label>

                <Select defaultValue={type} onChange={(e) => setType(e)}>
                    <Option disabled>Choose a login type</Option>
                    <Option value='patient'>patient</Option>
                    <Option value='doctor'>doctor</Option>
                </Select>

                <Button type='submit'>Login</Button>
            </form>
            {errorMessage && (
                <p className={styles['error-message']}>{errorMessage}</p>
            )}

            <p>Don't have an account yet?</p>
            <Link to={'/signup'}> Sign Up</Link>
        </div>
    );
}

export default LoginPage;
