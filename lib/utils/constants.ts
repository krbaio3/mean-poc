const basePath = __dirname;

export const CONST = {
  port: process.env.PORT || 3977,
  portMongodb: process.env.PORT_MONGO || 27017,
  nameDB: process.env.NAME_DB || 'mean',
  url: process.env.URI || 'localhost',
  uploadDir: `${basePath}/../../upload/users`
};
