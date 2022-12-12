import styles from './SearchBar.module.css';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = (props) => {
    return (
        <div
            className={`${styles.search} ${props.className
                .split(' ')
                .map((style) => styles[style])
                .join(' ')}`}
        >
            <input
                id='search'
                className={styles.input}
                placeholder='search for a doctor or a specialty...'
            />
            <label htmlFor='search' className={styles['icon-container']}>
                <SearchOutlined className={styles['search-icon']} />
            </label>
        </div>
    );
};

export default SearchBar;
