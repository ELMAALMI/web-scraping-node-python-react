import http from 'http';
import app from './app';
import { APP_CONF_VARIABLE } from './constant';
import connectDB from './config/db';
try {
    connectDB();

    const HttpServer = http.createServer(app);

    HttpServer.listen(APP_CONF_VARIABLE.APP_PORT, () =>
        console.log('app is running at port : ' + APP_CONF_VARIABLE.APP_PORT)
    );
} catch (error) {
    console.log(error);
}
