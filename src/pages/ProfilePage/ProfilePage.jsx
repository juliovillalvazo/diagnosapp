import styles from './ProfilePage.module.css';
import ProfileSection from '../../components/UI/ProfileSection/ProfileSection';
import { AuthContext } from '../../context/auth.context';
import { useContext, useState } from 'react';
import { Badge, Card, Space, Input, Button } from 'antd';
import userService from '../../services/userEdit.service';

function ProfilePage() {
    const { user, updateUser } = useContext(AuthContext);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const handleCancel = () => {
        setToggleEdit((prevValue) => !prevValue);
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await userService.updateOne(user._id, {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                email: email || user.email,
                type: user.type,
                profilePicture,
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
                            style={{ width: '150px' }}
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
                <Space
                    direction='vertical'
                    size='middle'
                    style={{ width: '100%' }}
                >
                    <Badge.Ribbon text='today' color='red'>
                        <Card>17:45 with Dr. Juan Carlos</Card>
                    </Badge.Ribbon>
                    <Badge.Ribbon text='soon' color='orange'>
                        <Card>17:45 with Dr. Juan Carlos</Card>
                    </Badge.Ribbon>
                    <Badge.Ribbon text='1 week to go' color='green'>
                        <Card>17:45 with Dr. Juan Carlos</Card>
                    </Badge.Ribbon>
                </Space>
            </ProfileSection>
        </div>
    );
}

export default ProfilePage;
