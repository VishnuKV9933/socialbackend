const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const User = require("../Models/UserModel");
const UserModel = require("../Models/UserModel");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.userJwtKey, {
    expiresIn: maxAge,
  });
};

const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.adminJwtKey, {
    expiresIn: maxAge,
  });
};

const handleErr = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "Email not in use") {
    errors.email = "Email not in use";
    return errors;
  } else if (err.message === "wrong pasword") {
    errors.password = "wrong pasword";
    return errors;
  } else if (err.message === "You are blocked by admin") {
    errors.block = "You are blocked by admin";
    return errors;
  } else if (err.message.includes("Users validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  console.log(err);
  if (err.keyPattern?.email === 1) {
    errors.email = "email is already in use";
    return errors;
  } else if (err.keyPattern?.mobile === 1) {
    errors.email = "Mobile number is already in use";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

const userSignUP = async (req, res) => {
  console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashPassword,
      mobile:req.body.mobile
    });
    await newUser.save().then((user) => {
      const token = createToken(user._id);

      res.status(200).json({ user: user, token: token, created: true });
    });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);

    res.json({ errors, created: false });
  }
};

const userLogin = async (req, res) => {
 
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("Email not in use");
    }

    if (user) {
      const validpassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validpassword) {
        throw new Error("wrong pasword");
      }

      if (validpassword) {
        if (!user.block) {
          const token = createToken(user._id);

          // res.cookie("jwt", token, {
          //   withCredentials: true,
          //   httpOnly: false,
          //   maxAge: maxAge * 10000,
          // });
          console.log("token",token); 

          res.status(200).json({ user: user, token: token });
        } else {
          throw new Error("You are blocked by admin");
        }
      }
    }
  } catch (err) {
    const errors = handleErr(err);

    res.json({ errors, created: false });
  }
};

const AdminLogin = (req, res) => {
  try {
    const Adminemail = process.env.AdminEmail;
    const Adminpassword = process.env.AdminPassword;

    const { email, password } = req.body;

    if (Adminemail != email) {
      throw new Error("Email not in use");
    } else if (Adminpassword != password) {
      throw new Error("wrong pasword");
    } else {
      const token = createAdminToken(process.env.AdminId);

      res.json({ status: true, token });
    }
  } catch (err) {
    const errors = handleErr(err);
    res.json({ errors, created: false });
  }
};

const Otplogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ mobile: req.params.mobile });

    if (!user) {
      res.json({ user: false });
    } else {
      res.json({ user: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const otpVerify = async (req, res) => {
  try {
    const user = await UserModel.findOne({ mobile: req.params.mobile });

    if (!user) {
      res.json({ user: false });
    } else {
      const token = createToken(user._id);
      res.json({ user: user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  userSignUP,
  userLogin,
  AdminLogin,
  Otplogin,
  otpVerify,
};
