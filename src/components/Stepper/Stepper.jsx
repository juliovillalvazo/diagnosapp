import styles from './Stepper.module.css';
import { Steps } from 'antd';

const { Step } = Steps;

const Stepper = (props) => {
    return (
        <div className={styles['stepper-container']}>
            <div className={styles.stepper}>
                <Steps current={props.step}>
                    <Step title='Choose a type' />
                    <Step title='Register your info' />
                    <Step title='done!' />
                </Steps>
            </div>
        </div>
    );
};

export default Stepper;
