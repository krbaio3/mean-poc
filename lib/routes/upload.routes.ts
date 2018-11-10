import { Router } from 'express';
import { UploadController } from '../controllers';
import { AuthMiddleware } from '../middleware/auth.middleware';
import ConnectMultiparty from 'connect-multiparty';
import { CONST } from '../utils/constants';

export class UploadRoutes {
  public router: Router;
  public uploadController: UploadController;
  public authMiddleware: AuthMiddleware = new AuthMiddleware();
  public multiparty: ConnectMultiparty = new ConnectMultiparty({
    uploadDir: CONST.uploadDir
  });

  constructor() {
    this.router = Router();
    this.uploadController = new UploadController();
    this.uploadFile();
    this.getImageUser();
    // this.multiparty = ConnectMultiparty({uploadDir: '../../upload/users'});
    // this.vehicles();
  }

  private uploadFile() {
    this.router.post(
      '/upload/:id',
      [this.authMiddleware.ensureAuth, this.multiparty],
      this.uploadController.uploadFile
    );
  }
  private getImageUser() {
    this.router.get(
      '/getImageUser/:imageFile',
      // [this.authMiddleware.ensureAuth, this.multiparty],
      this.uploadController.downloadFile
    );
  }
}
