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
    this.loginUser();
    this.getUser();
    this.getUsers();
    this.postUser();
    this.patchUser();
    this.deleteUser();
    // this.vehicles();
  }

  private getPruebaUser() {
    this.router.get('/prueba', this.userController.pruebaUser);
  }

  private postRegisterUser() {
    this.router.post('/addUser', this.userController.addUser);
  }

  private getUser() {
    this.router.get('/user', this.userController.getUser);
  }
  private getUsers() {
    this.router.get('/users', this.userController.getUsers);
  }

  private postUser() {
    this.router.post('/user', this.userController.postUser);
  }

  private patchUser() {
    this.router.patch('/user', this.userController.patchUser);
  }

  private deleteUser() {
    this.router.delete('/user', this.userController.deleteUser);
  }

  private loginUser() {
    this.router.post('/login', this.userController.loginUser);
  }
}
