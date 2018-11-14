import { Request, Response, NextFunction } from 'express';
import { Vehicle } from '../schemas/vehicle.schema';

export class VehicleController {

  // parar a POST
  public addVehicle(req: Request, res: Response, next: NextFunction): void {
    const newVehicle = new Vehicle(req.query);
    // console.log(`Esto es query: ${JSON.stringify(req.query, null, 4)}`);
    // console.log(`Esto es newVehicle: ${JSON.stringify(newVehicle, null, 4)}`);
    // res.status(200).send(req.query);
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

  public getVehicle(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una acción del controller'
    });
  }

  public putVehicle(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una acción del controller'
    });
  }

  public patchVehicles(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una acción del controller'
    });
  }

  public deleteVehicle(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una acción del controller'
    });
  }
}
