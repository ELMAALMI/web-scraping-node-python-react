import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';

const AppRouters: React.FC = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
        </Routes>
    );
};
export default AppRouters;
