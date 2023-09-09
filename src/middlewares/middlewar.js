import { UsersModel } from "../moduls/users.modul.js";

export const IsItCorrect= async (req, res, next)=>{
const {username, password}=req.body;
console.log(req.body);
console.log(username, password);
if(!username||!password)return res.json({
    msg:"malumot to'liq emas!  :("+username+password,
    data:req.body,
    file:req.file
});
const data=await UsersModel.findOne({where:{username:username}});
if(data)return res.json({msg:"bu username allaqachon band qilingan! :("});
next();
};


// export const MiddlewareById=async(req, res, next)=>{
// const id=req.params.id;
// const data=await UsersModel
// }