import styles from './ResultsPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import searchService from '../../services/search.service';
import { Spin } from 'antd';

const SearchPage = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchData = Object.fromEntries(queryParams);
    const { firstName, lastName } = searchData;
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            let formattedSearch = [];
            if (firstName)
                formattedSearch.push(`firstName=${firstName.toLowerCase()}`);
            if (lastName)
                formattedSearch.push(`lastName=${lastName.toLowerCase()}`);

            formattedSearch =
                formattedSearch.length > 1
                    ? formattedSearch.join('&')
                    : formattedSearch[0];

            const { data } = await searchService.getResult(formattedSearch);
            setResult([...data]);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }, [firstName, lastName]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <section className={styles.section}>
            <h3>your query result</h3>
            <div className={styles['results-container']}>
                {isLoading && (
                    <div>
                        <p>loading results...</p>
                        <Spin />
                    </div>
                )}
                {!isLoading &&
                    result.length !== 0 &&
                    result.map((doctor) => (
                        <div className={styles.result} key={doctor._id}>
                            <div className={styles['result-top']}>
                                <h3>
                                    {doctor.firstName} {doctor.lastName}
                                </h3>
                                <Link>see doctor profile</Link>
                            </div>

                            <p>specialty: {doctor.specialty.name}</p>
                        </div>
                    ))}
                {!isLoading && !result.length && <p>no results found!</p>}
            </div>
        </section>
    );
};

export default SearchPage;
