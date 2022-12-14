const controller = {};
const UserModel = require("../models/User");
const RecipeModel = require("../models/Recipe");
const loginHelper = require("../helpers/loginHelper");
const recipeHelper = require("../helpers/recipeHelper");

controller.login = async (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];
  try {
    const user = await UserModel.find({
      email: username,
      password,
    });
    let auth = false;
    if (user.length > 0) {
      req.session.auth = true;
      req.session.username = user[0].firstName;
      auth = true;
      res.render("admin/index.hbs", {
        auth,
        username: req.session.username,
        styleSheets: [
          {
            styleSheet: "addRecipe",
          },
        ],
      });
    } else {
      errors.push({ message: "Usuario no encontrado" });
      res.render("login/login.hbs", {
        messages: errors,
        auth,
        styleSheets: [
          {
            styleSheet: "login",
          },
        ],
      });
    }
  } catch (err) {
    req.session.auth = false;
    console.log(err);
  }
};
controller.renderRegister = (req, res, next) => {
  const auth = req.session.auth;
  auth == false || auth == undefined
    ? res.render("login/register.hbs", {
        styleSheets: [{ styleSheet: "register" }],
        auth,
      })
    : res.render("admin/index.hbs", {
        auth,
        username: req.session.username,
        styleSheets: [
          {
            styleSheet: "addRecipe",
          },
        ],
      });
};
controller.createUser = async (req, res, next) => {
  const { firstName, lastName, password, rePassword, email, reEmail, link } =
    req.body;
  //Realizar cambios despues
  let role = 1;
  let country = "chile";
  let avatar = "avatarImage.jpg";
  // hasta aqui
  let errors = [];
  if (!loginHelper.basicValidations(firstName))
    errors.push({
      message: "Nombre inválido (Debe contener entre 3 y 30 caracteres).",
    });
  if (!loginHelper.basicValidations(lastName))
    errors.push({
      message: "Apellido inválido (Debe contener entre 3 y 30 caracteres).",
    });
  if (!loginHelper.basicValidations(password))
    errors.push({
      message: "Password inválido (Debe contener entre 3 y 30 caracteres).",
    });
  if (rePassword != password)
    errors.push({ message: "Los passwords no coinciden." });
  if (reEmail != email) errors.push({ message: "Correos no coinciden." });
  if (role < 1 || role > 3) errors.push({ message: "Rol inválido." });
  if (
    email.length > 60 ||
    email.length < 4 ||
    !loginHelper.validateEmail(email)
  ) {
    errors.push({
      message: "Correo inválido (Debe contener entre 5 y 60 caracteres).",
    });
  }

  if (errors.length == 0) {
    try {
      const user = new UserModel({
        firstName,
        lastName,
        password,
        email,
        role,
        country,
        avatar,
        link,
      });
      await user.save();
      res.send("Registro exitoso!");
    } catch (err) {
      console.log(err.code);
      res.send(`Usuario ${err.keyValue.email} ya existe en la base de datos`);
    }
  } else {
    res.render("login/register.hbs", {
      errors,
      styleSheets: [
        {
          styleSheet: "register",
        },
      ],
      values: {
        firstName,
        lastName,
        password,
        rePassword,
        email,
        reEmail,
        link,
      },
    });
  }
};

controller.logout = (req, res, next) => {
  req.session.auth = false;
  res.render("login/logout.hbs", {
    auth: false,
    username: req.session.username,
  });
};
controller.renderNewRecipeForm = (req, res, next) => {
  const username = req.session.username;
  const auth = req.session.auth;
  if (!auth)
    res.render("login/login.hbs", {
      styleSheets: [
        {
          styleSheet: "login",
        },
      ],
      auth,
    });

  res.render("admin/newRecipe.hbs", {
    username,
    auth,
    styleSheets: [
      {
        styleSheet: "addRecipe",
      },
    ],
  });
};
controller.newRecipe = async (req, res, next) => {
  try {
    const recipe = recipeHelper.getRecipe(req.body, req.session.username);

    const newRecipe = new RecipeModel(recipe);
    // await newRecipe.save();

    res.send(newRecipe);
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
