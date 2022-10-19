var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var logger = require("morgan");
require("dotenv").config();
require("./db/database")();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
var app = express();
const {
  MONGODB_CONNECTION_DATABASE,
  MONGODB_CONNECTION_DBNAME,
  MONGODB_CONNECTION_USERNAME,
  MONGODB_CONNECTION_USERPASSWORD,
  MONGODB_CONNECTION_SESSION,
} = process.env;
const uri = `mongodb://${MONGODB_CONNECTION_USERNAME}:${MONGODB_CONNECTION_USERPASSWORD}@${MONGODB_CONNECTION_DATABASE}/${MONGODB_CONNECTION_DBNAME}`;
const store = new mongoDBStore({
  uri,
  collection: MONGODB_CONNECTION_SESSION,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

store.on("error", (err) => console.error(err));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/html" }));
app.use(
  session({
    secret: process.env.COOCKIE_PARSE_SECRETKEY,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store,
    resave: true,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOCKIE_PARSE_SECRETKEY));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
