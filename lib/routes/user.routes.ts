import { Router } from 'express';
import { UserController } from '../controllers';

export class UserRoutes {
  public router: Router;
  public userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.getPruebaUser();
    this.postRegisterUser();
    // this.vehicles();
  }

  private getPruebaUser() {
    this.router.get('/prueba', this.userController.pruebaUser);
  }
  private postRegisterUser() {
    this.router.post('/addUser', this.userController.addUser);
  }
}
