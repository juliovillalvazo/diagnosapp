import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import Button from '../UI/Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import stethoscopeImg from '../../assets/stethoscope.png';

function Navbar() {
    // Subscribe to the AuthContext to gain access to
    // the values from AuthContext.Provider's `value` prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
                    <Button onClick={logOutUser}>Logout</Button>

                    <Link to='/profile'>
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
                    </Link>
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
