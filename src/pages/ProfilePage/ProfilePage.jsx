import styles from './ProfilePage.module.css';
import ProfileSection from '../../components/UI/ProfileSection/ProfileSection';
import { AuthContext } from '../../context/auth.context';
import { useContext, useState, useCallback, useEffect } from 'react';
import { Badge, Card, Space, Input, Button } from 'antd';
import userService from '../../services/userEdit.service';

function ProfilePage() {
    const { user, updateUser } = useContext(AuthContext);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => {
        setToggleEdit((prevValue) => !prevValue);
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    const getAppointments = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await userService.getOne(user._id, user.type);

            const appointmentsData = data.appointments.map((a) => {
                return { ...a, appointment: new Date(a.appointment) };
            });

            setAppointments([...appointmentsData]);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }, [user._id, user.type]);

    useEffect(() => {
        getAppointments();
    }, [getAppointments]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await userService.updateOne(user._id, {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                email: email || user.email,
                type: user.type,
                profilePicture,
                description: description || user.description,
            });
            updateUser(user.type, data.authToken);
            setToggleEdit(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpload = async (e) => {
        try {
            const uploadData = new FormData();
            uploadData.append('profilePicture', e.target.files[0]);

            const { data } = await userService.uploadImg(user._id, uploadData);

            setProfilePicture(data.fileUrl);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <ProfileSection>
                {!toggleEdit && (
                    <>
                        <div>
                            <img
                                className={styles['profile-picture']}
                                src={profilePicture}
                                alt='profile'
                            />
                        </div>
                        <h3>
                            {user.type === 'doctor' && 'Dr'} {user.firstName}{' '}
                            {user.lastName}
                        </h3>
                        {user.type === 'doctor' && <p>{user.specialty}</p>}
                        <div>
                            <p>email address:</p>
                            <p>{user.email}</p>
                        </div>

                        {user.type === 'doctor' && (
                            <div>
                                <p>description:</p>
                                <p>{user.description}</p>
                            </div>
                        )}

                        <Button
                            className={styles.edit}
                            onClick={() =>
                                setToggleEdit((prevValue) => !prevValue)
                            }
                        >
                            edit profile
                        </Button>
                    </>
                )}
                {toggleEdit && (
                    <form onSubmit={handleEdit}>
                        <div>
                            <img
                                className={styles['profile-picture']}
                                src={profilePicture}
                                alt='profile'
                            />
                        </div>

                        <Input
                            style={{ width: '214px' }}
                            type='file'
                            onChange={(e) => handleUpload(e)}
                        />

                        {user.type === 'doctor' && (
                            <p>specialty: {user.specialty}</p>
                        )}
                        <div className={styles.input}>
                            <label htmlFor='firstName'>first name</label>
                            <Input
                                style={{ width: '150px' }}
                                type='text'
                                value={firstName || user.firstName}
                                id='firstName'
                                onChange={({ target }) =>
                                    setFirstName(target.value)
                                }
                            />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor='lastName'>last name</label>
                            <Input
                                id='lastName'
                                style={{ width: '150px' }}
                                type='text'
                                value={lastName || user.lastName}
                                onChange={({ target }) =>
                                    setLastName(target.value)
                                }
                            />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor='email'>email address:</label>
                            <Input
                                id='email'
                                style={{ width: '150px' }}
                                type='email'
                                value={email || user.email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                            />
                        </div>
                        {user.type === 'doctor' && (
                            <div className={styles.input}>
                                <label htmlFor='description'>
                                    description:
                                </label>
                                <Input.TextArea
                                    id='description'
                                    value={description || user.description}
                                    onChange={({ target }) =>
                                        setDescription(target.value)
                                    }
                                />
                            </div>
                        )}
                        <div className={styles['edit-actions']}>
                            <Button
                                className={styles['cancel-button']}
                                onClick={handleCancel}
                            >
                                cancel
                            </Button>
                            <Button htmlType='submit'>update profile</Button>
                        </div>
                    </form>
                )}
            </ProfileSection>
            <ProfileSection className='scroll'>
                <h3>next appointments</h3>
                {isLoading && <p>loading appointments...</p>}
                {!isLoading && appointments.length > 0 && (
                    <Space
                        direction='vertical'
                        size='middle'
                        style={{ width: '100%' }}
                    >
                        {appointments.map((a) => (
                            <Badge.Ribbon
                                key={a._id}
                                text={`${a.appointment.toLocaleDateString(
                                    'en-US'
                                )}`}
                                color='orange'
                            >
                                <Card>
                                    {user.type === 'patient' && (
                                        <span>
                                            {`${a.appointment.getHours()}:${a.appointment.getMinutes()}`}{' '}
                                            with Dr. {a.doctor.firstName}{' '}
                                            {a.doctor.lastName}
                                        </span>
                                    )}
                                    {user.type === 'doctor' && (
                                        <span>
                                            {`${a.appointment.getHours()}:${a.appointment.getMinutes()}`}{' '}
                                            with {a.patient.firstName}{' '}
                                            {a.patient.lastName}
                                        </span>
                                    )}
                                </Card>
                            </Badge.Ribbon>
                        ))}
                    </Space>
                )}
                {!isLoading && !appointments.length && (
                    <p>you don't have any appointments</p>
                )}
            </ProfileSection>
        </div>
    );
}

export default ProfilePage;
