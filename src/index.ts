import express, { Request,  Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database"));

const app = express();

//Middleware that Converts the body of API request to JSON
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response)=>{
  res.send({ message: "health OK!" });
  });

app.use("/api/my/user", myUserRoute);


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
