import * as bcrypt from 'bcrypt-nodejs';
import { UserModel, User } from '../models';
import { NextFunction, Response, Request } from 'express';

export class UserController {
    private SALT_WORK_FACTOR = 12;
    
    public addUser(req: Request, res: Response, next: NextFunction): void {
        // if(req.body){
        //     res.status(500).send({
        //         error: 'Body empty',
        //         code: '500'
        //     });
        // }
        
        const userModel = {
            name: req.body.name,
            email: req.body.email,
            role: 'ROLE_USER',
            img: 'null',
            password: req.body.password
        };

        const user = new User();
        
        console.log(userModel);
        console.log(user);
        if (req.body.password) {
            // Encryp the pass
            // res.status(200).send({
            //     name: user.name,
            //     email: user.email,
            //     role: 'ROLE_USER',
            //     image: 'null',
            //     password: params.password
            // });

            bcrypt.hash(req.body.password, null, null, (error, hash) => {
                console.log('Encripta');
                console.log(hash);
                if (error) {
                    console.log('error!!!!!!!!!!!!!!!!!!!');
                    console.error(error);
                    return res.send();
                    // return res.status(500).send({
                    //     error: 'Server Error',
                    //     code: '500'
                    // });
                }
                userModel.password = hash;
                if (userModel.name && userModel.email) {
                    console.log('entra');
                    user.save((err, userStored) => {
                        if (err) {
                            console.error('error2');
                            res.status(500).send({
                                error: 'Server Error',
                                code: '500'
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
                    })
                } else {
                    res.status(400).send({
                        error: 'Bad Request',
                        code: '400'
                    });
                }
            });

        } else {
            res.status(401).send({
                error: 'User not Authorized',
                code: '401'
            });
        }
    }

    public pruebaUser(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({
            message: 'Probando una accion del controller user'
        });
    }
}
