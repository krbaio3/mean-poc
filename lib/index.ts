import * as express from 'express';
import * as mongoose from 'mongoose';
import { App } from './app';
import * as blueBird from 'bluebird';
import { CONS } from './utils/constants';

class Server {
  private nameDB: string = CONS.nameDB;
  private port: string | number = CONS.port;
  private portMongodb: string | number = CONS.portMongodb;
  private url: string = CONS.url;
  public app: express.Application = new App().app;

  constructor() {
    this.mongoSetup();
  }

  public mongoSetup(): void {
    (<any>mongoose).Promise = blueBird;
    mongoose
      .connect(
        `mongodb://${this.url}:${this.portMongodb}/${this.nameDB}`,
        { useNewUrlParser: true }
      )
      .then(data => {
        console.log('La base de datos funciona');
        this.app.listen(this.port, () => {
          console.log(`Está escuchando en este puerto ${this.port}`);
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}

// tslint:disable-next-line:no-unused-expression
new Server();
