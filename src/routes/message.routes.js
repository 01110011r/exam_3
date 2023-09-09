import { Router } from "express";
import { messageSet } from "../controller/message.controller.js";


export const MRouter=Router();


MRouter.post("/api/message/:ch_id", messageSet);