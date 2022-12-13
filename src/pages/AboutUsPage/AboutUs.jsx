import React from 'react';
import fullLogo from '../../assets/full-logo.png';

import { InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <section className={styles.AboutUs}>
            <div className={styles.card}>
                <img className={styles.logo} src={fullLogo} alt='logo' />
                <div>
                    <p className={styles.description}>
                        With Diagnosapp, doctors and patients can easily
                        schedule appointments. It allows doctors to record
                        patient information.
                    </p>
                </div>
                <div className={styles.actions}>
                    <a
                        href='https://www.instagram.com/jlvillalvazo/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <InstagramOutlined /> <span>@jlvillalvazo</span>
                    </a>
                    <a
                        href='https://github.com/juliovillalvazo'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <GithubOutlined /> <span>@juliovillalvazo</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
