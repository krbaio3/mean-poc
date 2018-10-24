// 3rd party
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Routes } from './routes';

// routes
// import { VehicleRouter } from './routes/vehicle.routes';
// import userRoutes from './routes/user.routes';

export class App {
  public app: express.Application;
  public route: express.Router = new Routes().router;

  constructor() {
    // config cabeceras http
    // module.exports = app;
    // export const App = app;
    this.app = express();
    this.config();
    this.middleware();
    this.routes();
  }

  private config(): void {}

  private middleware(): void {
    this.app.use(cors());
    // this.app.use(morgan('short'));
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
    this.app.use('/api', this.route);
  }
}
