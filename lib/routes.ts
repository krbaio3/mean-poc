import { Router, Response, Request, NextFunction } from 'express';
import { VehicleRoutes } from './routes/index';

export class Routes {
  public router: Router;
  public vehiclesRouter: VehicleRoutes = new VehicleRoutes();

  constructor() {
    this.router = Router();
    this.router.use('/', (req: Request, res: Response, next: NextFunction) => {
      res.json('server runnning in /');
      console.log('Cookies: ', req.cookies);
    });
    this.router.use('/vehicles', this.vehiclesRouter.router);
  }
}
