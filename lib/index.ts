import express from 'express';
import mongoose from 'mongoose';
import { App } from './app';
import blueBird from 'bluebird';
import { CONST } from './utils/constants';

class Server {
  private nameDB: string = CONST.nameDB;
  private port: string | number = CONST.port;
  private portMongodb: string | number = CONST.portMongodb;
  private url: string = CONST.url;
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
