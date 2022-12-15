import styles from './SearchBar.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const SearchBar = (props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchData = [];
        if (firstName) searchData.push(firstName);
        if (lastName) searchData.push(lastName);
        if (!searchData.length)
            return setErrorMessage('please enter valid search data');

        const formattedSearch = searchData
            .reduce((prev, curr, i) => {
                if (curr === firstName) {
                    return [...prev, `firstName=${curr}`];
                }

                if (curr === lastName) {
                    return [...prev, `lastName=${curr}`];
                }
                return prev;
            }, [])
            .join('&');

        navigate({
            pathname: '/results',
            search: `?${formattedSearch}`,
        });
    };

    return (
        <div
            className={`${styles.search} ${props.className
                .split(' ')
                .map((style) => styles[style])
                .join(' ')}`}
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    id='name'
                    className={styles.input}
                    placeholder='first name'
                    value={firstName}
                    onChange={({ target }) => setFirstName(target.value)}
                />

                <input
                    id='last-name'
                    className={styles.input}
                    placeholder='last name'
                    value={lastName}
                    onChange={({ target }) => setLastName(target.value)}
                />
                <Button
                    className={styles.button}
                    htmlType='submit'
                    type='primary'
                >
                    <SearchOutlined />
                </Button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default SearchBar;
