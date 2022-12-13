import React from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import MainContent from '../components/MainContent';
const Home: React.FC = () => {
    return (
        <>
            <NavBar />
            <HeroSection />
            <MainContent />
        </>
    );
};

export default Home;
