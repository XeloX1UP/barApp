var express = require("express");
const controller = require("../controllers/logincontroller");
var router = express.Router();
const userController = require("../controllers/logincontroller");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const username = req.session.username;
  const auth = req.session.auth;
  if (auth) {
    res.render("admin/index.hbs", {
      username,
      auth,
      styleSheets: [
        {
          styleSheet: "addRecipe",
        },
      ],
    });
  } else {
    res.render("login/login.hbs", {
      styleSheets: [
        {
          styleSheet: "login",
        },
      ],
      auth,
    });
  }
});

router.post("/login", userController.login);
router.get("/register", controller.renderRegister);
router.post("/register", controller.createUser);
router.get("/logout", controller.logout);

module.exports = router;
