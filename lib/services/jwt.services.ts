import { Request, Response, NextFunction } from 'express';
import { decode } from 'jwt-simple';
import { unix, now } from 'moment';

export class JwtServices {
  public key = 'SECRET_TOKEN';
  constructor() {}

  public ensureAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: 'La peticion no tiene cabecera de autenticación'
      });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
      const payload = decode(token, this.key);
      if (payload.exp <= unix(now())) {
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
