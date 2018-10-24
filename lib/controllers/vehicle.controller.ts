import { Request, Response, NextFunction } from 'express';

export class VehicleController {
    public getVehicles(req: Request, res: Response, next: NextFunction): void {
    res.status(200).send({
      message: 'Probando una accion del controller'
    });
  }
}
