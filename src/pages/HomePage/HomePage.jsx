import React, { useContext } from 'react';
import styles from './HomePage.module.css';
import stethoscopeImg from '../../assets/stethoscope.png';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { AuthContext } from '../../context/auth.context';
import { Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import SearchBar from '../../components/SearchBar/SearchBar';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

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
        <React.Fragment>
            <div className={styles.container}>
                <header className={styles.header}>
                    <nav className={styles.navbar}>
                        <Link to='/'>
                            <div className={styles.logo}></div>
                        </Link>

                        <div className={styles['right-actions']}>
                            {!isLoggedIn && (
                                <>
                                    <Link to='/signup'>
                                        <Button className='transparent'>
                                            sign up
                                        </Button>
                                    </Link>
                                    <Link to='/login'>
                                        <Button>login</Button>
                                    </Link>
                                </>
                            )}
                            {isLoggedIn && (
                                <div className={styles['right-actions']}>
                                    <Dropdown.Button
                                        menu={menuProps}
                                        onClick={handleMenuClick}
                                    >
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
                                            <span>
                                                {user && user.firstName}
                                            </span>
                                        </div>
                                    </Dropdown.Button>
                                </div>
                            )}
                        </div>
                    </nav>
                    <img
                        className={styles.stethoscope}
                        src={stethoscopeImg}
                        alt='stethoscope'
                    />
                    <h1 className={styles.title}>
                        find the doctor you've been looking for!
                    </h1>
                    <SearchBar className='center-page box-shadow' />
                </header>
                <section className={styles.cards}>
                    <Card
                        title='Certified Doctors'
                        description='find the doctor you need, in our certified doctors database'
                        imgSrc='https://doctorweb.agency/assets/img/blog/directorio-de-doctores.jpg'
                    />
                    <Card
                        title='Schedule'
                        description='Search availability with your doctor and schedule your appointment'
                        imgSrc='https://calendar.umaine.edu/wp-content/uploads/sites/15/2015/08/Calendarview-423x281.png'
                    />
                    <Card
                        title='Organize'
                        description='Have control for your patients appointments'
                        imgSrc='https://99designs-start-attachments.imgix.net/alchemy-pictures/2017%2F05%2F18%2F00%2F30%2F33%2F0e31540f-8821-4d33-b1f1-e6b7b4206f0f%2FOrganize-your-work.png?auto=format&ch=Width%2CDPR&fm=png&w=800&h=750'
                    />
                    <Card
                        title='Review'
                        description='Review your patients previous diagnoses'
                        imgSrc='https://snacknation.com/wp-content/uploads/2019/06/how-to-organize-office-filing-system-1.png'
                    />
                </section>
            </div>
        </React.Fragment>
    );
}

export default HomePage;
