import { NextFunction, Response, Request } from 'express';
import { authenticate } from 'passport';
import { JwtServices } from '../services/jwt.service';

export class AuthController {
  public authLogin(req: Request, res: Response, next: NextFunction): void {

    console.log('AuthController Body', req.body);

    authenticate('local', { session: false }, (err, user, info) => {
      console.error('error', err);
      console.warn('warn', info);

      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = new JwtServices().setPayload(user);
        return res.json({ user, token });
      });
    })(req, res, next);
  }
}
