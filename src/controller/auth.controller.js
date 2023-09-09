import bcrypt from "bcrypt";
import { jwtHelper } from "../utils/jwtoken.js";
import "dotenv/config";
import { UsersModel } from "../moduls/main.modul.js";



export const Register = (data) => {
  const token = jwtHelper.sign(
    { id: data.id, username: data.username, password: data.password },
    process.env.SECRET_KEY
  );
  return token;
};




export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.send({ msg: "malumot to'liq emas! :(" });

    const data = await UsersModel.findOne({ where: { username: username } });

    if (!data) return res.send({ msg: "user not found!  :(" });
   
    const passwordCompare = await bcrypt.compare(
      String(password),
      data.password
    );

    if (!passwordCompare) return res.send({ msg: "Invalit password!  :(" });

    const token = jwtHelper.sign(
      { id: data.id, username: data.username, password: data.password },
      process.env.SECRET_KEY
    );
    res.send({ token });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
