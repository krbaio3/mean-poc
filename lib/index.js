import mongoose from 'mongoose';
import { app } from './app';
import blueBird from 'bluebird';

const port = process.env.PORT || 3977;
const portMongodb = process.env.PORT_MONGO || 27017;
const nameDB = process.env.NAME_DB || 'mean';
const url = process.env.URI || 'localhost';

mongoose.Promise = blueBird;
mongoose
  .connect(`mongodb://${url}:${portMongodb}/${nameDB}`, { useNewUrlParser: true })
  .then(data => {
    console.log('La base de datos funciona');
    app.listen(port, () => {
      console.log(`Está escuchando en este puerto ${port}`);
    });
  })
  .catch(error => {
    throw new Error(error);
  });
