import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>
                    <Link to='/about-us'>about us</Link>
                </li>
                <li>
                    <a
                        href='https://github.com/juliovillalvazo/diagnosapp'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        github
                    </a>
                </li>
                <li>contact</li>
            </ul>
            <p>&copy; diagnosapp</p>
        </footer>
    );
};

export default Footer;
