import { Router } from 'express';
import { UserController } from '../controllers';
import { AuthMiddleware } from '../middleware/auth.middleware';

export class UserRoutes {
  public router: Router;
  public userController: UserController;
  public authMiddleware: AuthMiddleware = new AuthMiddleware();

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.getPruebaUser();
    this.postRegisterUser();
    this.loginUser();
    this.getUser();
    this.getUsers();
    this.postUser();
    this.putUser();
    this.patchUser();
    this.deleteUser();
    // this.vehicles();
  }

  private getPruebaUser() {
    this.router.get(
      '/prueba',
      this.authMiddleware.ensureAuth,
      this.userController.pruebaUser
    );
  }

  private postRegisterUser() {
    this.router.post('/addUser', this.userController.addUser);
  }
  private loginUser() {
    this.router.post('/login', this.userController.loginUser);
  }

  private getUser() {
    this.router.get('/user', this.userController.getUser);
  }
  private getUsers() {
    this.router.get('/users', this.userController.getUsers);
  }

  private putUser() {
    this.router.put(
      '/update/:id',
      this.authMiddleware.ensureAuth,
      this.userController.putUser
    );
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
}
