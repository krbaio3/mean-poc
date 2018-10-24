import { Router } from 'express';
import { VehicleController } from '../controllers';

export class VehicleRoutes {
  public router: Router;
  public vehiclesCtrl: VehicleController;

  constructor() {
    this.router = Router();
    this.vehiclesCtrl = new VehicleController();
    this.getVehicles();
    // this.vehicles();
  }

  private getVehicles() {
    this.router.get('/vehicles', this.vehiclesCtrl.getVehicles);
  }
}
