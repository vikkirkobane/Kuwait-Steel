import express, { Request,  Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import {v2 as cloudinary } from "cloudinary";
import myReportRoute from "./routes/MyReportRoute";
import reportRoute from "./routes/ReportRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//Middleware that Converts the body of API request to JSON
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response)=>{
  res.send({ message: "health OK!" });
  });

app.use("/api/my/user", myUserRoute);
app.use("/api/my/report", myReportRoute);
app.use("/api/report", reportRoute);


app.listen(7000, ()=>{
    console.log("Server is running on localhost:7000");
    }); 

/*
const server = app.listen(7000, () => {
    const address = server.address();
        if (address && typeof address !== "string") {
                console.log(`Server is running at http://${address.address}:${address.port}`);
                    } else {
                            console.log("Failed to get server address");
                                }
                                });
                                */
