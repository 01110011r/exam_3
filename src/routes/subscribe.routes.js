import { Router } from "express";
import { Subscribe, mySubscriptions, unSubscribe } from "../controller/subscribe.controller.js";

export const SRouter=Router();

SRouter.post("/api/subscribe/:s_id", Subscribe);
SRouter.delete("/api/subscribe/:s_id", unSubscribe);
SRouter.get("/api/subscribe/all", mySubscriptions);