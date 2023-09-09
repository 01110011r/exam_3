import { Router } from "express";
import { createGroup, groupDelete, groupGet, groupGetAll, updateGroup } from "../controller/group.controller.js";

import { upload } from "../utils/multerconfig.js";

export const GRouter=Router();

GRouter.post("/api/group", upload.single('avatar'), createGroup);
GRouter.get("/api/group/my", groupGet);
GRouter.get("/api/group/all", groupGetAll);
GRouter.delete("/api/group/:g_id", groupDelete);
GRouter.put("/api/group/:g_id", upload.single('avatar'), updateGroup);