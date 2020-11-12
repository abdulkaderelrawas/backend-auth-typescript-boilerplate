import { Application, Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { protect, admin } from '../middlewares/AuthMiddleware';
export class UserRoutes {
  private app: Application;
  private userRouter: Router;
  private userController: UserController;

  constructor(app: Application) {
    this.app = app;
    this.userRouter = Router();

    this.app.use('/api/v1/users', this.userRouter);
    this.userController = new UserController();
  }

  public setConfig(): void {
    this.setUserRoutes();
  }

  private setUserRoutes(): void {
    //        d8888      8888888b.       888b     d888      8888888      888b    888
    //       d88888      888  "Y88b      8888b   d8888        888        8888b   888
    //      d88P888      888    888      88888b.d88888        888        88888b  888
    //     d88P 888      888    888      888Y88888P888        888        888Y88b 888
    //    d88P  888      888    888      888 Y888P 888        888        888 Y88b888
    //   d88P   888      888    888      888  Y8P  888        888        888  Y88888
    //  d8888888888      888  .d88P      888   "   888        888        888   Y8888
    // d88P     888      8888888P"       888       888      8888888      888    Y888

    this.userRouter
      .route('/')
      .get(protect, admin, (req: any, res: Response) => {
        this.userController
          .getUsers()
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    this.userRouter
      .route('/:id')
      .delete(protect, admin, (req: any, res: Response) => {
        this.userController
          .deleteUser(req.params.id)
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    this.userRouter
      .route('/:id')
      .get(protect, admin, (req: any, res: Response) => {
        this.userController
          .getUserById(req.params.id)
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    this.userRouter
      .route('/:id')
      .put(protect, admin, (req: any, res: Response) => {
        this.userController
          .updateUser(req)
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    // 8888888b.       8888888b.        .d88888b.       88888888888      8888888888       .d8888b.       88888888888
    // 888   Y88b      888   Y88b      d88P" "Y88b          888          888             d88P  Y88b          888
    // 888    888      888    888      888     888          888          888             888    888          888
    // 888   d88P      888   d88P      888     888          888          8888888         888                 888
    // 8888888P"       8888888P"       888     888          888          888             888                 888
    // 888             888 T88b        888     888          888          888             888    888          888
    // 888             888  T88b       Y88b. .d88P          888          888             Y88b  d88P          888
    // 888             888   T88b       "Y88888P"           888          8888888888       "Y8888P"           888

    this.userRouter
      .route('/profile')
      .get(protect, (req: any, res: Response) => {
        this.userController
          .getUserProfile(req.user._id)
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    this.userRouter
      .route('/profile')
      .put(protect, (req: any, res: Response) => {
        this.userController
          .updateUserProfile(req)
          .then((result) => {
            res.send({ result: true, code: 200, data: result });
          })
          .catch((error) => {
            res.send({ result: false, code: 500, message: error });
          });
      });

    // 8888888b.       888     888      888888b.        888           8888888       .d8888b.
    // 888   Y88b      888     888      888  "88b       888             888        d88P  Y88b
    // 888    888      888     888      888  .88P       888             888        888    888
    // 888   d88P      888     888      8888888K.       888             888        888
    // 8888888P"       888     888      888  "Y88b      888             888        888
    // 888             888     888      888    888      888             888        888    888
    // 888             Y88b. .d88P      888   d88P      888             888        Y88b  d88P
    // 888              "Y88888P"       8888888P"       88888888      8888888       "Y8888P"

    /**
     * @description   Resgister a new user
     * @route         POST /api/v1/users
     * @access        Public
     */
    this.userRouter.route('/').post((req: Request, res: Response) => {
      this.userController
        .registerUser(req.body)
        .then((result) => {
          res.status(201);
          res.send({ result: true, code: 201, data: result });
        })
        .catch((error) => {
          res.status(400);
          res.send({ result: false, code: 400, message: error });
        });
    });

    /**
     * @description   Login & get Token
     * @route         POST /api/v1/users
     * @access        Public
     */
    this.userRouter.route('/login').post((req: Request, res: Response) => {
      this.userController
        .login(req.body)
        .then((result) => {
          res.status(200);
          res.send({ result: true, code: 200, data: result });
        })
        .catch((error) => {
          res.status(401);
          res.send({ result: false, code: 401, message: error });
        });
    });
  }
}
