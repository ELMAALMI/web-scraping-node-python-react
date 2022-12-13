import axios from 'axios';
import React from 'react';
import AppRouters from './router';

axios.defaults.baseURL =
    process.env.NODE_ENV !== 'development'
        ? process.env.BACK_END_URL
        : 'http://localhost:3000/api/v1/';
const App: React.FC = () => {
    return <AppRouters />;
};

export default App;
