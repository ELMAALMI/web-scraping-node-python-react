import mongoose from 'mongoose';
import { APP_CONF_VARIABLE } from '../constant';
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(APP_CONF_VARIABLE.DB_URI!);
        console.log('MongoDb database is Connected ......');
    } catch (error) {
        console.log('db error : \n');
        console.log(error);
    }
};
export default connectDB;
