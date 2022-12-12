import styles from './ProfilePage.module.css';
import ProfileSection from '../../components/UI/ProfileSection/ProfileSection';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { Badge, Card, Space } from 'antd';

function ProfilePage() {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <ProfileSection>
                <div>
                    <img
                        className={styles['profile-picture']}
                        src={user.profilePicture}
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
                <div>
                    <p>password</p>
                    <p>********</p>
                </div>
                <p className={styles.edit}>edit profile</p>
            </ProfileSection>
            <ProfileSection className='scroll'>
                <h3>appointments</h3>
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
                    <Badge.Ribbon text='soon' color='green'>
                        <Card>17:45 with Dr. Juan Carlos</Card>
                    </Badge.Ribbon>
                    <Badge.Ribbon text='soon' color='orange'>
                        <Card>17:45 with Dr. Juan Carlos</Card>
                    </Badge.Ribbon>
                </Space>
            </ProfileSection>
        </div>
    );
}

export default ProfilePage;
