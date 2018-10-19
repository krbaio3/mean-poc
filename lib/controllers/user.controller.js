import {
    User
} from '../models/user.model';
import bcrypt from 'bcrypt-nodejs';

const SALT_WORK_FACTOR = 12;

export function pruebaUser(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controller user'
    });
}


export const registerUser = (req, res) => {

    const user = new User();
    const params = req.body;

    user.name = params.name;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        // Encryp the pass
        // res.status(200).send({
        //     name: user.name,
        //     email: user.email,
        //     role: 'ROLE_USER',
        //     image: 'null',
        //     password: params.password
        // });

        bcrypt.hash(params.password, null, null, (error, hash) => {
            debugger;
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
            user.password = hash;
            if (user?.name && user?.email) {
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