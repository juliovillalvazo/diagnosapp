import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import Button from '../UI/Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import stethoscopeImg from '../../assets/stethoscope.png';
import { Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Navbar() {
    // Subscribe to the AuthContext to gain access to
    // the values from AuthContext.Provider's `value` prop
    const navigate = useNavigate();
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const handleMenuClick = () => {
        navigate('/profile');
    };

    const items = [
        {
            label: 'logout',
            key: '1',
            icon: <UserOutlined />,
            danger: true,
        },
    ];

    const menuProps = {
        items,
        onClick: () => {
            logOutUser();
        },
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to='/'>
                    <div className={styles.logo}></div>
                </Link>
                <SearchBar className='normal-navbar box-shadow' />
            </div>
            <img
                className={styles.stethoscope}
                src={stethoscopeImg}
                alt='stethoscope'
            />

            {isLoggedIn && (
                <div className={styles['right-actions']}>
                    <Dropdown.Button menu={menuProps} onClick={handleMenuClick}>
                        <div className={styles['profile-pic']}>
                            <img
                                src={user.profilePicture}
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: '50%',
                                    display: 'block',
                                }}
                                alt='profile'
                            />
                            <span>{user && user.firstName}</span>
                        </div>
                    </Dropdown.Button>
                </div>
            )}

            {!isLoggedIn && (
                <div className={styles['right-actions']}>
                    <Link to='/signup'>
                        <Button className='transparent'>sign up</Button>
                    </Link>
                    <Link to='/login'>
                        <Button>login</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
