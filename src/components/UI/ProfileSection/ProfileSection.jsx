import styles from './ProfileSection.module.css';

const ProfileSection = (props) => {
    return (
        <div className={`${styles.container} ${styles[props.className]}`}>
            {props.children}
        </div>
    );
};

export default ProfileSection;
