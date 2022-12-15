import styles from './DoctorProfilePage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import searchService from '../../services/search.service';
import { useEffect, useCallback, useState, useContext } from 'react';
import { Button } from 'antd';
import { AuthContext } from '../../context/auth.context';

const DoctorProfilePage = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { id } = useParams();
    const [doctorInfo, setDoctorInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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

        navigate(`/schedule/doctors/${id}`);
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
                        <p>rating: 5 estrellas</p>
                        <p>speciality: {doctorInfo.specialty.name}</p>
                    </div>
                    <div>
                        <p>about this doctor:</p>
                        <p>something cool about this doctor je ne sais pa</p>
                    </div>
                    <div>
                        <p>reviews</p>
                    </div>
                    <div>
                        {errorMessage && (
                            <p className={styles.error}>you need to log in</p>
                        )}
                        <Button
                            type='primary'
                            className={styles.button}
                            onClick={handleClick}
                        >
                            schedule your consultation
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DoctorProfilePage;
