const { Schema, model } = require("mongoose");

const userModel = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      validate(value) {
        if (value.lenght < 3)
          throw new Error("Nombre debe ser de almenos 3 caracteres");
      },
    },
    lastName: {
      type: String,
      require: true,
      validate(value) {
        if (value.lenght < 3)
          throw new Error("Apellido debe ser de almenos 3 caracteres");
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (value.lenght < 4)
          throw new Error("Password debe ser de almenos 4 caracteres");
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate(value) {
        if (value.lenght < 5)
          throw new Error("Correo debe ser de almenos 5 caracteres");
      },
    },
    role: Number,
    country: String,
    avatar: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userModel);
