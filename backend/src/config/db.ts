import mongoose from 'mongoose';
import { APP_CONF_VARIABLE } from '../constant';
const connectDB = async () => {
    await mongoose.connect(APP_CONF_VARIABLE.DB_URI!);
    console.log('MongoDb database is Connected ......');
};
export default connectDB;
