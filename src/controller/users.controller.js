import { ChannelModel, GroupModel, UsersModel } from "../moduls/main.modul.js";
import { jwtHelper } from "../utils/jwtoken.js";
import { Register } from "./auth.controller.js";
import bcrypt from "bcrypt";
import "dotenv/config";

export const createUser = async (req, res) => {
  try {
    const { username, password, first_name, second_name, description } =
      req.body;
  
   
    const hashPasswd = bcrypt.hashSync(
      String(password),
      +process.env.SALT_ROUNDS
    );
   
    let avatarka =
      "http://" +
      req.hostname +
      ":" +
      process.env.PORT +
      "/" +
      req.file.filename;
    
    const data = await UsersModel.create({
      avatarka,
      password: hashPasswd,
      username,
      first_name,
      second_name,
      description,
    });
    const token = Register(data);
    return res.send({ token });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "invalit tokin!  :(",
      });

    const data = await UsersModel.findOne({ where: { id: id } });

    res.send({
      data,
    });
  } catch (error) {
    console.log("user controller---> " + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await UsersModel.findAll({
      include: [GroupModel, ChannelModel],
    });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const u_id = req.params.id;
    let avatarka =
      "http://" +
      req.hostname +
      ":" +
      process.env.PORT +
      "/" +
      req.file.filename;
   
    const newData = req.body;
    newData.avatar = avatarka;
    const update = await UsersModel.update(req.body, { where: { id: u_id } });
  
    if (update[0]) {
      const data = await UsersModel.findOne({ where: { id: u_id } });
      return res.status(201).json({
        status: 201,
        data,
        msg: "update",
      });
    }

    res.send({ msg: "id not found! " });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const u_id = req.params.id;
  
   await UsersModel.destroy({ where: { id: u_id } });
    
    res.send({ msg: "deleted was id: " + u_id });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
