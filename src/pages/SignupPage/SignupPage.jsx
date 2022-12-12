import styles from './SignupPage.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import authService from '../../services/auth.service';
import Button from '../../components/UI/Button/Button';
import Stepper from '../../components/Stepper/Stepper';
import SignUpForm from '../../components/SignUp/SignUpForm';
import { Result } from 'antd';

function SignupPage() {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [type, setType] = useState('');
    const [step, setStep] = useState(0);

    const handleSignupSubmit = (
        email,
        password,
        firstName,
        lastName,
        specialty = null
    ) => {
        // Create an object representing the request body
        let requestBody;

        if (specialty) {
            requestBody = { email, password, firstName, lastName, specialty };
        } else {
            requestBody = { email, password, firstName, lastName };
        }

        // Or using a service
        authService
            .signup(requestBody)
            .then((response) => {
                // If the POST request is successful redirect to the login page
                setStep(2);
                setType('');
            })
            .catch((error) => {
                // If the request resolves with an error, set the error message in the state
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleTypeButton = (e) => {
        if (e.target.textContent === 'patient') {
            setType('patient');
        } else {
            setType('doctor');
        }
        setStep(1);
    };

    const handlePrev = () => {
        setStep(0);
        setType('');
    };

    return (
        <section className={styles['signup-container']}>
            <Stepper step={step} />

            {step === 0 && (
                <>
                    <h2>Please choose your account type</h2>
                    <Button onClick={handleTypeButton}>patient</Button>
                    <Button className='blue' onClick={handleTypeButton}>
                        doctor
                    </Button>
                </>
            )}

            {step === 1 && (
                <SignUpForm
                    onSubmit={handleSignupSubmit}
                    type={type}
                    errorMessage={errorMessage}
                    handlePrev={handlePrev}
                />
            )}

            {step !== 2 && (
                <div>
                    <p>Already have an account?</p>
                    <Link to={'/login'}> Login</Link>
                </div>
            )}

            {step === 2 && (
                <div className={styles.success}>
                    <Result
                        status='success'
                        title='Successfully created your account!'
                        extra={[
                            <Link to='/login'>
                                <Button className='position-center'>
                                    login
                                </Button>
                            </Link>,
                        ]}
                    />
                </div>
            )}
        </section>
    );
}

export default SignupPage;
