import styles from './SignUpForm.module.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Button from '../UI/Button/Button';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { Input, Select } from 'antd';

const { Option } = Select;

const SignUpForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialty, setSpecialty] = useState('choose a specialty');
    const [specialties, setSpecialties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);

    const getSpecialties = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                'http://localhost:5005/api/specialties'
            );

            setSpecialties(data);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getSpecialties();
    }, [getSpecialties]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.type === 'patient') {
            props.onSubmit(email, password, firstName, lastName);
        } else {
            props.onSubmit(email, password, firstName, lastName, specialty);
        }
    };

    return (
        <div className={styles.main}>
            <h1>Sign Up</h1>

            <form className={styles['form-container']} onSubmit={handleSubmit}>
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

                <label>First name:</label>

                <Input
                    placeholder='enter your first name'
                    name='name'
                    value={firstName}
                    onChange={handleFirstName}
                    prefix={<UserOutlined />}
                />

                <label>Last name:</label>

                <Input
                    placeholder='enter your last name'
                    name='name'
                    value={lastName}
                    onChange={handleLastName}
                    prefix={<UserOutlined />}
                />

                {props.type === 'doctor' && isLoading && (
                    <div>loading specialties...</div>
                )}

                {props.type === 'doctor' && !isLoading && (
                    <>
                        <label>choose a specialty:</label>
                        <Select
                            placeholder='choose a specialty'
                            onChange={(e) => setSpecialty(e)}
                            required={true}
                        >
                            {specialties.map((specialty) => (
                                <Option
                                    key={specialty._id}
                                    value={specialty._id}
                                >
                                    {specialty.name}
                                </Option>
                            ))}
                        </Select>
                    </>
                )}

                <div className={styles['form-actions']}>
                    <Button className='blue' onClick={props.handlePrev}>
                        Prev
                    </Button>
                    <Button type='submit'>Sign Up</Button>
                </div>
            </form>

            {props.errorMessage && (
                <p className={styles['error-message']}>{props.errorMessage}</p>
            )}
        </div>
    );
};

export default SignUpForm;
