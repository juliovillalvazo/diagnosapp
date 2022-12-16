import styles from './CalendarPage.module.css';
import { Badge, Calendar } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import userService from '../../services/userEdit.service';
import { AuthContext } from '../../context/auth.context';

const CalendarPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(AuthContext);

    const getAppointments = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await userService.getOne(user._id, user.type);

            const appointmentsData = data.appointments.map((a) => {
                return { ...a, appointment: new Date(a.appointment) };
            });

            setAppointments([...appointmentsData]);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }, [user._id, user.type]);

    useEffect(() => {
        getAppointments();
    }, [getAppointments]);

    const monthCellRender = (value) => {
        const busy = appointments.some(
            (a) => a.appointment.getMonth() === value.month()
        );
        if (busy) {
            const filtered = appointments.filter(
                (a) => a.appointment.getMonth() === value.month()
            );
            return (
                <div className='notes-month'>
                    <p>{filtered.length} appointments</p>
                    {filtered.map((a) => (
                        <p key={a._id}>
                            {`${a.appointment.getDate()}/${
                                a.appointment.getMonth() + 1
                            }`}{' '}
                            {a.firstName} {a.lastName}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const dateCellRender = (value) => {
        const listData = appointments.filter((a) => {
            return (
                a.appointment.getDate() === value.date() &&
                a.appointment.getMonth() === value.month()
            );
        });
        return (
            <ul className='events'>
                {listData.map((a) => (
                    <li key={a._id}>
                        <Badge
                            status='success'
                            text={`${a.appointment.getHours()}:${a.appointment.getMinutes()} ${
                                a.firstName
                            } ${a.lastName}`}
                        />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <section className={styles.calendar}>
            <div className={styles.calendarCard}>
                <h3>Appointments history</h3>
                {isLoading && <p>loading...</p>}
                {!isLoading && (
                    <Calendar
                        style={{ borderRadius: '20px', padding: '2%' }}
                        dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}
                    />
                )}
            </div>
        </section>
    );
};

export default CalendarPage;
