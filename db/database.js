const mongoose = require("mongoose");
const {
  MONGODB_CONNECTION_DATABASE,
  MONGODB_CONNECTION_USERNAME,
  MONGODB_CONNECTION_USERPASSWORD,
  MONGODB_CONNECTION_DBNAME,
  MONGODB_CONNECTION_PORT,
} = process.env;
const uri = `mongodb://${MONGODB_CONNECTION_USERNAME}:${MONGODB_CONNECTION_USERPASSWORD}@${MONGODB_CONNECTION_DATABASE}/${MONGODB_CONNECTION_DBNAME}?retryWrites=true&w=majority`;

module.exports = () =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("DB conectada a ", db.connection.host))
    .catch((err) => console.error(err));
