const { model } = require("mongoose");

const helper = {};
helper.cleanText = (value) => {
  return value.trim().toLowerCase();
};
helper.basicValidations = (value) => {
  value = helper.cleanText(value);
  if (value.length < 3 || value.length > 30) {
    return false;
  }
  return true;
};
helper.validateEmail = (mail) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};

module.exports = helper;
