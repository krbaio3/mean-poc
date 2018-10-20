// 3rd party 

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// routes
import vehiclesRoutes from './routes/vehicle.routes'
import userRoutes from './routes/user.routes'


export const app = express();

// config
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// config cabeceras http

// rutas base
app.use('/api', vehiclesRoutes);
app.use('/api', userRoutes);


// module.exports = app;
// export const App = app;