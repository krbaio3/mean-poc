import { decode } from 'jwt-simple';
import moment from 'moment';
import { JwtServices } from '../services/jwt.service';
import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  constructor() {}

  public ensureAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: 'La petición no tiene cabecera de autenticación'
      });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
      const key: string = new JwtServices().getKey();
      const payload = decode(token, key);
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token expirado' });
      }
      req.user = payload;
    } catch (error) {
      console.error(error);
      return res.status(404).send({ message: 'Token inválido' });
    }
    next();
  }
}
