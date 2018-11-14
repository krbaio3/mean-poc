import { Router } from 'express';
import { VehicleController } from '../controllers';

export class VehicleRoutes {
  public router: Router;
  public vehiclesCtrl: VehicleController;

  constructor() {
    this.router = Router();
    this.vehiclesCtrl = new VehicleController();
    this.getVehicles();
    this.getVehicle();
    this.addVehicle();
    this.putVehicle();
    this.patchVehicle();
    this.deleteVehicle();
    // this.vehicles();
  }

  private getVehicles() {
    this.router.get('/', this.vehiclesCtrl.getVehicles);
  }

  private getVehicle() {
    this.router.get('/', this.vehiclesCtrl.getVehicle);
  }

  private addVehicle() {
    this.router.post('/addVehicle', this.vehiclesCtrl.addVehicle);
  }

  private putVehicle() {
    this.router.put('/', this.vehiclesCtrl.getVehicle);
  }

  private patchVehicle() {
    this.router.patch('/', this.vehiclesCtrl.getVehicle);
  }

  private deleteVehicle() {
    this.router.delete('/', this.vehiclesCtrl.getVehicle);
  }
}
