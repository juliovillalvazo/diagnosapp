import styles from './Stepper.module.css';
import { Steps } from 'antd';

const Stepper = (props) => {
    return (
        <div className={styles['stepper-container']}>
            <div className={styles.stepper}>
                <Steps
                    current={props.step}
                    items={[
                        { title: 'Choose a type' },
                        { title: 'Register your info!' },
                        { title: 'Done!' },
                    ]}
                />
            </div>
        </div>
    );
};

export default Stepper;
