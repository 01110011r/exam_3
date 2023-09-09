import { Router } from "express";
import { channelDelete, channelGet, channelGetAll, createChannel, updateChannel } from "../controller/channel.controller.js";
import { upload } from "../utils/multerconfig.js";

export const CRouter=Router();


CRouter.post("/api/channel", upload.single('avatar'), createChannel);
CRouter.delete("/api/channel/:c_id", channelDelete);
CRouter.get("/api/channel/my", channelGet);
CRouter.get("/api/channel/all", channelGetAll);
CRouter.put("/api/channel/:c_id", upload.single('avatar'), updateChannel);