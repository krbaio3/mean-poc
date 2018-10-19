import * as mongoose from 'mongoose';

export class App {
  private urlConnect = 'mongodb://localhost:27017';
  private db = 'mean';

  constructor() {
    this.connectDB();
  }

  private connectDB(): void {
    mongoose
      .connect(`${this.urlConnect}/${this.db}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}
