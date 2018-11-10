import { NextFunction, Response, Request } from 'express';
import { User } from '../schemas/user.schema';
import { ErrorModel } from '../models';
import { MulterFile } from '../models/multipart.model';
// import { rename, stat } from 'fs';
import { resolve } from 'path';
import { exists } from 'fs';
import { CONST } from '../utils/constants';

export class UploadController {
  /**
   * uploadFile
   */
  public uploadFile(
    req: MulterFile,
    res: Response,
    next: NextFunction
  ): Response {
    const userID = req.params.id;
    console.log('userID', userID);

    if (req.files) {
      const filePath = req.files.image.path;

      const fileSplit = filePath.split('/');
      const fileName = fileSplit[fileSplit.length - 1];
      const fileExt = fileName.split('.');
      const extension = fileExt[fileExt.length - 1];
      const isExtension = /(jpe?g|png|gif|bmp)$/i.test(extension);

      if (isExtension) {
        User.findOneAndUpdate(userID, { img: fileName })
          .exec()
          .then(update => {
            if (!update) {
              const err: ErrorModel = {
                error: 'No se ha podido actualizar la imagen',
                message: 'No se ha podido actualizar la imagen',
                code: 500
              };
              res.status(500).send(err);
            } else {
              res.status(200).send({ img: update });
            }
          })
          .catch(error => {
            const err: ErrorModel = {
              error,
              message: 'Error al actualizar la imagen',
              code: 500
            };
            res.status(500).send(err);
          });
      } else {
        return res.status(500).send({ message: 'Extensión inválida' });
      }

      // Hacer un lastIndexOf '.' para encontrar la extensión, o hacer la regexp
      // para determinar las extensiones de archivos( /\.(jpe?g|png|gif|bmp)$/i)
      // y hacer el rename del archivo al id del usuario.

      // rename(filePath, `${newFilePath}/${name}`, error => {
      //   if (error) {
      //     return res.status(500).send({ error });
      //   }
      //   console.log('renamed complete');
      //   return res.status(200).send({ message: 'Ha subido' });
      // });

      // stat(`${final}/${name}`, (err, stats) => {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log('stats: ' + JSON.stringify(stats));
      // });
    } else {
      console.log(req.body);
      return res.status(500).send({ message: 'No ha subido' });
    }
    // if (req.params) {
    //   res.status(500).send({
    //     error: 'Body empty',
    //     code: '500'
    //   });
    // }
    // console.log(req.body);
    // if (!req.body) {
    //   res.status(500).send({
    //     error: 'Body empty',
    //     code: '500'
    //   });
    // }
    // res.status(200).send({ message: 'working' });
  }

  //     const userModel: UserModel = {
  //       name: req.body.name,
  //       email: req.body.email,
  //       // role: 'ROLE_USER',
  //       role: req.body.role,
  //       img: 'null',
  //       password: req.body.password,
  //       phone: req.body.phone
  //     };

  //     console.log(userModel);
  //     // console.log(user);
  //     if (req.body.password) {
  //       // Encryp the pass
  //       // res.status(200).send({
  //       //     name: user.name,
  //       //     email: user.email,
  //       //     role: 'ROLE_USER',
  //       //     image: 'null',
  //       //     password: params.password
  //       // });
  //       let count = 0;
  //       hash(
  //         req.body.password,
  //         null,
  //         () => {
  //           console.log(`in progress.. ${count++}`);
  //         },
  //         (error, hashing) => {
  //           console.log('Encripta');
  //           console.log(hashing);
  //           if (error) {
  //             console.log('error!!!!!!!!!!!!!!!!!!!');
  //             console.error(error);
  //             return res.status(500).send({
  //               error: error,
  //               msg: error
  //             });
  //             // return res.status(500).send({
  //             //     error: 'Server Error',
  //             //     code: '500'
  //             // });
  //           }
  //           userModel.password = hashing;
  //           if (userModel.name && userModel.email) {
  //             console.log('entra');
  //             const user = new User(userModel);
  //             user.save((err, userStored) => {
  //               if (err) {
  //                 console.error('error2');
  //                 res.status(400).send({
  //                   error: err,
  //                   msg: err.message
  //                 });
  //               } else {
  //                 console.log('else');
  //                 if (!userStored) {
  //                   console.log('userStored');
  //                   res.status(404).send({
  //                     error: 'No se ha registrado el usuario',
  //                     code: '404'
  //                   });
  //                 } else {
  //                   res.status(200).send({
  //                     user: userStored
  //                   });
  //                 }
  //               }
  //             });
  //           } else {
  //             res.status(400).send({
  //               error: 'Bad Request',
  //               code: '400'
  //             });
  //           }
  //         }
  //       );
  //     } else {
  //       res.status(401).send({
  //         error: 'User not Authorized',
  //         code: '401'
  //       });
  //     }
  //   }

  /**
   * downloadFile
   */
  public downloadFile(req: Request, res: Response, next: NextFunction) {
    const fileImage = req.params.imageFile;

    exists(`${CONST.uploadDir}/${fileImage}`, exist => {
      if (exist) {
        res.sendFile(resolve(`${CONST.uploadDir}/${fileImage}`));
      } else {
        const err: ErrorModel = {
          error: 'Imagen no existe',
          message: 'La imagen no existe',
          code: 500
        };
        res.status(500).send(err);
      }
    });
  }
}
