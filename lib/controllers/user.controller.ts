import { hash, compare } from 'bcrypt-nodejs';
import { UserModel, LoginModel } from '../models';
import { NextFunction, Response, Request } from 'express';
import { User } from '../schemas/user.schema';
import { ErrorModel } from 'models/error.model';

export class UserController {
  private SALT_WORK_FACTOR = 12;

  public addUser(req: Request, res: Response, next: NextFunction): void {
    // if(req.body){
    //     res.status(500).send({
    //         error: 'Body empty',
    //         code: '500'
    //     });
    // }

    const userModel: UserModel = {
      name: req.body.name,
      email: req.body.email,
      // role: 'ROLE_USER',
      role: req.body.role,
      img: 'null',
      password: req.body.password,
      phone: req.body.phone
    };

    console.log(userModel);
    // console.log(user);
    if (req.body.password) {
      // Encryp the pass
      // res.status(200).send({
      //     name: user.name,
      //     email: user.email,
      //     role: 'ROLE_USER',
      //     image: 'null',
      //     password: params.password
      // });
      let count = 0;
      hash(
        req.body.password,
        null,
        () => {
          console.log(`in progress.. ${count++}`);
        },
        (error, hash) => {
          console.log('Encripta');
          console.log(hash);
          if (error) {
            console.log('error!!!!!!!!!!!!!!!!!!!');
            console.error(error);
            return res.status(500).send({
              error: error,
              msg: error
            });
            // return res.status(500).send({
            //     error: 'Server Error',
            //     code: '500'
            // });
          }
          userModel.password = hash;
          if (userModel.name && userModel.email) {
            console.log('entra');
            const user = new User(userModel);
            user.save((err, userStored) => {
              if (err) {
                console.error('error2');
                res.status(400).send({
                  error: err,
                  msg: err.message
                });
              } else {
                console.log('else');
                if (!userStored) {
                  console.log('userStored');
                  res.status(404).send({
                    error: 'No se ha registrado el usuario',
                    code: '404'
                  });
                } else {
                  res.status(200).send({
                    user: userStored
                  });
                }
              }
            });
          } else {
            res.status(400).send({
              error: 'Bad Request',
              code: '400'
            });
          }
        }
      );
    } else {
      res.status(401).send({
        error: 'User not Authorized',
        code: '401'
      });
    }
  }

  public loginUser(req: Request, res: Response, next: NextFunction) {
    const login: LoginModel = Object.assign({}, req.body);

    User.findOne(
      { email: login.email.toLowerCase() },
      (err, user: UserModel) => {
        if (err) {
          const error: ErrorModel = {
            error: err,
            message: err.message,
            code: 500
          };
          res.status(500).send(error);
        } else {
          if (!user) {
            const error: ErrorModel = {
              error: err,
              message: 'El usuario no existe',
              code: 400
            };
            res.status(400).send(error);
          } else {
            compare(login.password, user.password, (err, check) => {
              if (err) {
                const error: ErrorModel = {
                  error: err,
                  message: 'Usuario no puede hacer login',
                  code: 404
                };
                res.status(404).send(error);
              } else {
                if (check) {
                  // devolver datos usuario logeado
                  if (req.body.gethash) {
                    // token JWT. Implementarlo con Passport-openID
                  } else {
                    res.status(200).send({
                      user
                    });
                  }
                }
              }
            });
          }
        }
      }
    );
  }

  public pruebaUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando una accion del controller user'
    });
  }

  public getUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando un usuario getUSer'
    });
  }

  public getUsers(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando varios usuarios getUSers'
    });
  }

  public postUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando varios usuarios getUSers'
    });
  }

  public putUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando un usuario getUSer'
    });
  }

  public patchUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando un usuario getUSer'
    });
  }

  public deleteUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando un usuario getUSer'
    });
  }
}
