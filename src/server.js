import express from "express";
import "dotenv/config";
import path from "path";
import { URouter } from "./routes/users.routes.js";
import { GRouter } from "./routes/group.routes.js";
import { CRouter } from "./routes/channel.routes.js";
import { SRouter } from "./routes/subscribe.routes.js";
import { MRouter } from "./routes/message.routes.js";


const app=express();


const main=()=>{
    try {

        app.use(express.json());
        app.use(express.static(path.join(process.cwd(), "uploads")))
        app.use(express.urlencoded({extended:true}));
        app.use(URouter);
        app.use(GRouter);
        app.use(CRouter);
        app.use(SRouter);
        app.use(MRouter);

    } catch (error) {
        console.log(error.message);
    }

    const port=process.env.PORT || 7000;
    const host=process.env.HOST || 'localhost';
    
    app.listen(port, ()=>console.log(`Server has been started on port ${port}`));
}

main();