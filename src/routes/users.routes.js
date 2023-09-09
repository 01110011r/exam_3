import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controller/users.controller.js";
import { IsItCorrect } from "../middlewares/middlewar.js";
import { Login } from "../controller/auth.controller.js";
import { upload } from "../utils/multerconfig.js";


export const URouter=Router();


URouter.post('/api/signup', upload.single("avatar"), IsItCorrect, createUser);
URouter.post('/api/signin', Login);
URouter.get('/api', getAllUser);
URouter.get("/api/account", getUser);
URouter.put('/api/userupdate/:id', upload.single("avatar"), updateUser);
URouter.delete('/api/userdelete/:id', deleteUser);