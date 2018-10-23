import * as express from 'express';
import * as mongoose from 'mongoose';
import { App } from './app';
import * as blueBird from 'bluebird';
import { CONS } from './utils/constants';

const nameDB: string = CONS.nameDB;
const port: string | number = CONS.port;
const portMongodb: string | number = CONS.portMongodb;
const url: string = CONS.url;
const app: express.Application = new App().app;

function mongoSetup(): void {
  (<any>mongoose).Promise = blueBird;
  mongoose
    .connect(
      `mongodb://${url}:${portMongodb}/${nameDB}`,
      { useNewUrlParser: true }
    )
    .then(data => {
      console.log('La base de datos funciona');
      app.listen(port, () => {
        console.log(`Está escuchando en este puerto ${port}`);
      });
    })
    .catch(error => {
      throw new Error(error);
    });
}

mongoSetup();
