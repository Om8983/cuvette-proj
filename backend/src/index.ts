import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config()

// import all the routes
import authRoutes from "./routes/google-auth/google-routes"
import {router} from "./routes/index-routes"

//middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(passport.initialize())

// implementing routes 
app.use("/auth", authRoutes);
app.use("/app/v1", router);


// db connect and server start 
;( async () => {
    try{
        const connection = await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`)
        console.log("Db connected successfully");
        
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port${process.env.PORT}`);
        })
    }catch(error){
        console.log("error occured while connecting to database", error);
        process.exit(1);
    }
})()