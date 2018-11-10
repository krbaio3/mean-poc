// 3rd party
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import { initialize, session } from 'passport';
import helmet from 'helmet';
import { Routes } from './routes';
import { AuthController } from './passport/auth.controller';
import { PassportCustom } from './passport/passport';

// routes
// import { VehicleRouter } from './routes/vehicle.routes';
// import userRoutes from './routes/user.routes';

export class App {
  public app: express.Application;
  public route: express.Router = new Routes().router;
  public authController: AuthController = new AuthController();
  public passportCustom: PassportCustom;

  constructor() {
    // config cabeceras http
    // module.exports = app;
    // export const App = app;
    this.app = express();
    this.config();
    this.middleware();
    this.routes();
  }

  private config(): void {
    this.app.use(helmet());
    this.app.use(cors());
    // this.app.use(morgan('short'));
    this.app.use(morgan('dev'));
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cookieParser());
  }

  private middleware(): void {
    this.app.use(initialize());
    this.app.use(session());
    this.passportCustom = new PassportCustom();
  }

  private routes(): void {
    this.app.use('/api', this.route);
    this.app.use('/auth', this.authController.authLogin);
  }
}
