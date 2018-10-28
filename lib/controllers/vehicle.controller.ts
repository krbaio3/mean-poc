import { Request, Response, NextFunction } from 'express';
import { Vehicle } from 'schemas/vehicle.schema';

export class VehicleController {
  public addVehicles(req: Request, res: Response, next: NextFunction): void {
    const newVehicle = new Vehicle(req.body);

    newVehicle.save((error, nVehicle) => {
      if (error) {
        res.send(error);
      }
      res.status(200).send(nVehicle);
      // res.json(nVehicle);
    });
  }

  public getVehicles(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una acción del controller'
    });
  }
}
