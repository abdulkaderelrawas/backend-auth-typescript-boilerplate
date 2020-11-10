import express, { Application, Request, Response, Router } from 'express';
import { UserRoutes } from './routes/UserRoutes';
import dotenv from 'dotenv';
import morgan from 'morgan';

export class App {
  static readonly PORT: String | Number = process.env.PORT || 5000;
  private app: Application;

  //    .d8888b.   .d88888b.  888b    888  .d8888b. 88888888888 8888888b.  888     888  .d8888b. 88888888888 .d88888b.  8888888b.
  // d88P  Y88b d88P" "Y88b 8888b   888 d88P  Y88b    888     888   Y88b 888     888 d88P  Y88b    888    d88P" "Y88b 888   Y88b
  // 888    888 888     888 88888b  888 Y88b.         888     888    888 888     888 888    888    888    888     888 888    888
  // 888        888     888 888Y88b 888  "Y888b.      888     888   d88P 888     888 888           888    888     888 888   d88P
  // 888        888     888 888 Y88b888     "Y88b.    888     8888888P"  888     888 888           888    888     888 8888888P"
  // 888    888 888     888 888  Y88888       "888    888     888 T88b   888     888 888    888    888    888     888 888 T88b
  // Y88b  d88P Y88b. .d88P 888   Y8888 Y88b  d88P    888     888  T88b  Y88b. .d88P Y88b  d88P    888    Y88b. .d88P 888  T88b
  //  "Y8888P"   "Y88888P"  888    Y888  "Y8888P"     888     888   T88b  "Y88888P"   "Y8888P"     888     "Y88888P"  888   T88b

  constructor() {
    dotenv.config();
    this.createServer();
  }

  //    .d8888b.       8888888888      8888888b.       888     888      8888888888      8888888b.
  // d88P  Y88b      888             888   Y88b      888     888      888             888   Y88b
  // Y88b.           888             888    888      888     888      888             888    888
  //  "Y888b.        8888888         888   d88P      Y88b   d88P      8888888         888   d88P
  //     "Y88b.      888             8888888P"        Y88b d88P       888             8888888P"
  //       "888      888             888 T88b          Y88o88P        888             888 T88b
  // Y88b  d88P      888             888  T88b          Y888P         888             888  T88b
  //  "Y8888P"       8888888888      888   T88b          Y8P          8888888888      888   T88b

  private createServer(): void {
    this.app = express();

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(express.json());

    const port = process.env.PORT || App.PORT;

    this.app.get('/', (req: Request, res: Response) => {
      res.send('API is up and running...');
    });

    this.app.listen(port, () => {
      console.log(
        `SERVER running in ${process.env.NODE_ENV} mode on PORT: ${port}`
      );
    });
  }

  //    .d8888b.  8888888888 88888888888             d8888 8888888b.  8888888b.
  // d88P  Y88b 888            888                d88888 888   Y88b 888   Y88b
  // 888    888 888            888               d88P888 888    888 888    888
  // 888        8888888        888              d88P 888 888   d88P 888   d88P
  // 888  88888 888            888             d88P  888 8888888P"  8888888P"
  // 888    888 888            888            d88P   888 888        888
  // Y88b  d88P 888            888           d8888888888 888        888
  //  "Y8888P88 8888888888     888          d88P     888 888        888

  public getApp(): Application {
    return this.app;
  }
}
