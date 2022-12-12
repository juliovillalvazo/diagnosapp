import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>about us</li>
                <li>github</li>
                <li>contact</li>
                <li>spanish</li>
            </ul>
            <p>&copy; diagnosapp</p>
        </footer>
    );
};

export default Footer;
