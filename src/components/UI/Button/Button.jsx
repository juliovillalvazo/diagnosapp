import styles from './Button.module.css';

const Button = (props) => {
    return (
        <button
            className={`${styles.button} ${styles[props.className]}`}
            onClick={props.onClick ? props.onClick : () => {}}
        >
            {props.children}
        </button>
    );
};

export default Button;
