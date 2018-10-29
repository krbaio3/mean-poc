import { Router, Response, Request, NextFunction } from 'express';
import { VehicleRoutes } from './routes/index';
import { UserRoutes } from './routes/user.routes';

export class Routes {
  public router: Router;
  public vehiclesRouter: VehicleRoutes = new VehicleRoutes();
  public userRouter: UserRoutes = new UserRoutes();

  constructor() {
    this.router = Router();
    this.router.use('/vehicles', this.vehiclesRouter.router);
    this.router.use('/user', this.userRouter.router);
    this.router.use('/', (req: Request, res: Response, next: NextFunction) => {
      res.json('server runnning in /');
      console.log('Cookies: ', req.cookies);
    });
  }
}
