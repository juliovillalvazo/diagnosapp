import styles from './DoctorProfilePage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import searchService from '../../services/search.service';
import { useEffect, useCallback, useState, useContext } from 'react';
import { Button, Input } from 'antd';
import { AuthContext } from '../../context/auth.context';
import { DeleteOutlined } from '@ant-design/icons';
import reviewService from '../../services/review.service';
import { useToken } from 'antd/es/theme/internal';

const DoctorProfilePage = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const { id } = useParams();
    const [doctorInfo, setDoctorInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [newReview, setNewReview] = useState('');
    const [postError, setPostError] = useState('');

    const navigate = useNavigate();

    const getDoctorData = useCallback(async () => {
        try {
            const { data } = await searchService.getDoctorInfo(id);
            setDoctorInfo({ ...data });
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        getDoctorData();
    }, [getDoctorData]);

    const handleClick = () => {
        if (!isLoggedIn) {
            setErrorMessage('you need to log in');
            return;
        }

        if (user.type === 'doctor') {
            setErrorMessage('you need to create a patient account');
            return;
        }

        navigate(`/schedule/doctors/${id}`);
    };

    const deleteHandler = async (e) => {
        try {
            const idReview =
                e.target.parentNode.parentNode.getAttribute('name');
            await reviewService.deleteReview(id, idReview);
            getDoctorData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        try {
            if (!newReview) throw new Error('you need to write a review!');
            await reviewService.createReview(id, {
                author: user._id,
                content: newReview,
            });
            setNewReview('');
            setPostError('');
            getDoctorData();
        } catch (err) {
            console.log(err);
            setPostError(err.message);
        }
    };

    return (
        <section className={styles.section}>
            {!doctorInfo.firstName && <p>loading...</p>}
            {doctorInfo.firstName && (
                <div className={styles.container}>
                    <div className={styles.left}>
                        <img
                            className={styles['profile-picture']}
                            src={doctorInfo.profilePicture}
                            alt='profile'
                        />
                        <h3 className={styles.name}>
                            {doctorInfo.firstName} {doctorInfo.lastName}
                        </h3>

                        <p>speciality: {doctorInfo.specialty.name}</p>
                    </div>

                    <div>
                        <p>about this doctor:</p>
                        <p>{doctorInfo.description}</p>
                        {errorMessage && (
                            <p className={styles.error}>{errorMessage}</p>
                        )}
                        <Button
                            type='primary'
                            className={styles.button}
                            onClick={handleClick}
                        >
                            schedule your consultation
                        </Button>
                    </div>

                    <div>
                        <p>reviews</p>
                        <ul className={styles.reviews}>
                            {doctorInfo.reviews.length > 0 &&
                                doctorInfo.reviews.map((r) => (
                                    <li key={r._id}>
                                        <p>{r.content}</p>
                                        <p>
                                            by: {r.author.firstName}{' '}
                                            {user &&
                                                r.author._id === user._id && (
                                                    <span
                                                        name={r._id}
                                                        className={
                                                            styles.delete
                                                        }
                                                        onClick={deleteHandler}
                                                    >
                                                        <DeleteOutlined />
                                                    </span>
                                                )}
                                        </p>
                                    </li>
                                ))}
                            {!doctorInfo.reviews.length && (
                                <li>be the first one to leave a review!</li>
                            )}
                        </ul>
                    </div>

                    {user?.type === 'patient' && (
                        <form onSubmit={handleReview}>
                            <Input.TextArea
                                onChange={({ target }) =>
                                    setNewReview(target.value)
                                }
                                placeholder='write here your review...'
                                value={newReview}
                            />
                            <Button htmlType='submit'>post review</Button>
                            {postError && (
                                <p className={styles.error}>{postError}</p>
                            )}
                        </form>
                    )}
                </div>
            )}
        </section>
    );
};

export default DoctorProfilePage;
