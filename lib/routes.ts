import { Router, Response, Request, NextFunction } from 'express';
import { VehicleRoutes } from './routes/index';
import { UserRoutes } from './routes/user.routes';
import { UploadRoutes } from './routes/upload.routes';

export class Routes {
  public router: Router;
  public vehiclesRouter: VehicleRoutes = new VehicleRoutes();
  public userRouter: UserRoutes = new UserRoutes();
  public uploadRouter: UploadRoutes = new UploadRoutes();

  constructor() {
    this.router = Router();
    this.router.use('/vehicles', this.vehiclesRouter.router);
    this.router.use('/user', this.userRouter.router);
    this.router.use('/file', this.uploadRouter.router);
    this.router.use('/', (req: Request, res: Response, next: NextFunction) => {
      res.json('server runnning in /');
      console.log('Cookies: ', req.cookies);
    });
  }
}
