import { hash, compare } from 'bcrypt-nodejs';
import { UserModel, LoginModel } from '../models';
import { NextFunction, Response, Request } from 'express';
import { User } from '../schemas/user.schema';
import { ErrorModel } from '../models';
import { JwtServices } from '../services/jwt.service';

export class UserController {
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
        (error, hashing) => {
          console.log('Encripta');
          console.log(hashing);
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
          userModel.password = hashing;
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
            compare(login.password, user.password, (error, check) => {
              if (error) {
                const errorVar: ErrorModel = {
                  error,
                  message: 'Usuario no puede hacer login',
                  code: 404
                };
                res.status(404).send(errorVar);
              } else {
                if (check) {
                  // devolver datos usuario logeado
                  if (req.body.gethash) {
                    // token JWT. Implementarlo con Passport-openID
                    // const jwtServices = new JwtServices();
                    // console.log('------------->', jwtServices);
                    res.status(200).send({
                      token: new JwtServices().setPayload(user)
                    });
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
      message: 'Probando una accion del controller user PruebaUSer'
    });
  }

  public getUser(req: Request, res: Response, next: NextFunction) {

    console.log('--->', req.params);
    console.log('--------->', req.body);

    const login: LoginModel = Object.assign({}, req.body);

    console.log(login);

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
            res.status(200).send({
              user
            });
          }
        }
      }
    );
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
    console.log(req.body);
    console.log(req.params);

    const userID = req.params.id;
    const userUpdate = req.body;

    // res.status(200).send({message:'ok'});

    User.findByIdAndUpdate(userID, userUpdate)
      .exec()
      .then(update => {
        if (!update) {
          const err: ErrorModel = {
            error: 'No se ha podido actualizar el usuario',
            message: 'No se ha podido actualizar el usuario',
            code: 500
          };
          res.status(500).send(err);
        } else {
          res.status(200).send({ user: update });
        }
      })
      .catch(error => {
        const err: ErrorModel = {
          error,
          message: 'Error al actualizar el usuario',
          code: 500
        };
        res.status(500).send(err);
      });
  }

  public patchUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    console.log(req.params);

    const userID = req.params.id;
    const userUpdate = req.body;

    res.status(200).send({ message: 'ok' });

    // User.findByIdAndUpdate(userID, userUpdate)
    //   .exec()
    //   .then(update => {
    //     if (!update) {
    //       const err: ErrorModel = {
    //         error: 'No se ha podido actualizar el usuario',
    //         message: 'No se ha podido actualizar el usuario',
    //         code: 500
    //       };
    //       res.status(500).send(err);
    //     } else {
    //       res.status(200).send({ user: update });
    //     }
    //   })
    //   .catch(error => {
    //     const err: ErrorModel = {
    //       error,
    //       message: 'Error al actualizar el usuario',
    //       code: 500
    //     };
    //     res.status(500).send(err);
    //   });
  }

  public deleteUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
      message: 'Probando un usuario getUSer'
    });
  }
}
