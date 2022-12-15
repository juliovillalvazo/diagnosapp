import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Footer from './components/Layout/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';
import AboutUs from './pages/AboutUsPage/AboutUs';
import Contact from './pages/ContactPage/ContactPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import DoctorProfilePage from './pages/DoctorProfilePage/DoctorProfilePage';
import SchedulePage from './pages/SchedulePage/SchedulePage';

function App() {
    const { pathname } = useLocation();

    return (
        <div className='App'>
            {pathname !== '/' && <Navbar />}

            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route
                    path='/profile'
                    element={
                        <IsPrivate>
                            <ProfilePage />
                        </IsPrivate>
                    }
                />
                <Route
                    path='/calendar'
                    element={
                        <IsPrivate>
                            <CalendarPage />
                        </IsPrivate>
                    }
                />

                <Route
                    path='/schedule/doctors/:idDoctor'
                    element={
                        <IsPrivate>
                            <SchedulePage />
                        </IsPrivate>
                    }
                />

                <Route path='/doctor/:id' element={<DoctorProfilePage />} />

                <Route path='/results' element={<ResultsPage />} />

                <Route
                    path='/signup'
                    element={
                        <IsAnon>
                            <SignupPage />
                        </IsAnon>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <IsAnon>
                            <LoginPage />
                        </IsAnon>
                    }
                />

                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
