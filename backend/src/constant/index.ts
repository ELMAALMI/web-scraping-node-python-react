import dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

export const APP_CONF_VARIABLE = { APP_PORT, DB_URI };
