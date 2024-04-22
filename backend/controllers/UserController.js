const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {

    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(422).json({
        message: "Por favor, utilize outro e-mail",
        errors: ["Por favor, utilize outro e-mail"],
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(422).json({
        message: "Usuário ou senha incorreto",
        errors: ["Usuário ou senha incorreto"],
      });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({
        message: "Usuário ou senha incorreto",
        errors: ["Usuário ou senha incorreto"],
      });
      return;
    }
    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {

    let currentUser;

    try {
      if (req.headers.authorization) {
        const token = getToken(req);
        const decoded = jwt.verify(token, "nossosecret");

        currentUser = await User.findById(decoded.id);
        currentUser.password = undefined;
      } else {
        currentUser = null;
      }
      res.status(200).send(currentUser);
    } catch (error) {
      res
        .status(422)
        .json({ message: "Acesso negado!", errors: ["Acesso negado!"] });
    }
  }
  s;
  static async getUserById(req, res) {
 
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado",
        errors: ["Usuário não encontrado"],
      });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
  
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmPassword } = req.body;

    if (req.file) {
      user.image = req.file.filename;
    }
    const userExists = await User.findOne({ email });
    if (user.email !== email && userExists) {
      res.status(422).json({
        message: "Por favor utilize outro e-mail",
        errors: ["Por favor utilize outro e-mail"],
      });
      return;
    }
    user.email = email;

    if (password !== confirmPassword) {
      res.status(422).json({ errors: ["As senhas não são iguais"] });
      return;
    } else if (password === confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    try {
      await User.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true }
      );
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        errors: [err],
      });
    }
  }
};