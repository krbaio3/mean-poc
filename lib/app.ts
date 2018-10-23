// 3rd party
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';

// routes
// import vehiclesRoutes from './routes/vehicle.routes';
// import userRoutes from './routes/user.routes';

export class App {
  public app: express.Application;

  constructor() {
    // config cabeceras http
    // module.exports = app;
    // export const App = app;
    this.app = express();
    this.config();
    // this.routes();
  }

  private config(): void {
    // config
    this.app.use(morgan('dev'));
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private routes(): void {
    // rutas base
    // this.app.use('/api', vehiclesRoutes);
    // this.app.use('/api', userRoutes);
  }
}