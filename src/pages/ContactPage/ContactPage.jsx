import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import feedback from '../../services/feedback.service';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ContactPage = () => {
    const [fromName, setFromName] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!message || !fromName) {
                throw new Error(
                    'please enter a brief intro and describe your feedback!'
                );
            }

            await feedback.postFeedback({ from_name: fromName, message });

            setMessage('');
            setFromName('');
            navigate('/');
        } catch (err) {
            setIsValid(false);
            setErrorMessage(err.message);
            console.log(err);
        }
    };
    return (
        <section className={styles.contact}>
            <div className={styles.card}>
                <div className={styles['left-side']}>
                    <h3>Send us your feedback!</h3>
                    <form className={styles.form} onSubmit={submitHandler}>
                        <div className={styles.input}>
                            <label>Brief intro for your feedback</label>
                            <Input
                                type='text'
                                placeholder='write here...'
                                onChange={({ target }) =>
                                    setFromName(target.value)
                                }
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Describe your feedback</label>

                            <TextArea
                                onChange={({ target }) =>
                                    setMessage(target.value)
                                }
                                rows={4}
                            />
                        </div>

                        <Button
                            htmlType='submit'
                            icon={<SendOutlined />}
                            type='primary'
                            ghost
                        >
                            Submit
                        </Button>
                        {!isValid && (
                            <p className={styles['error-message']}>
                                {errorMessage}
                            </p>
                        )}
                    </form>
                </div>
                <div className={styles['right-side']}>
                    <img
                        className={styles.feedbackImg}
                        src='https://cdn-icons-png.flaticon.com/512/2620/2620669.png'
                        alt='feedback'
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
