import { Request, Response } from "express";
import Report from "../models/report";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findOne({ user: req.userId });
    if (!report) {
      return res.status(404).json({ message: "report not found" });
    }
    res.json(report);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching report" });
  }
};

const createMyReport = async (req: Request, res: Response) => {
  try {
    // const existingReport = await Report.find({ user: req.userId });
// 
//     // if Report exists you cannot create a new one
//     if (existingReport) {
//       return res.status(409).json({ message: "User report already exists"});
//     }
// 
  
  const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const report = new Report(req.body);
    report.imageUrl = imageUrl;
    report.user = new mongoose.Types.ObjectId(req.userId);
    report.lastUpdated = new Date();
    await report.save();
    
    res.status(201).send(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findOne({
      user: req.userId,
    });

    if (!report) {
      return res.status(404).json({ message: "report not found" });
    }

    report.reportName = req.body.reportName;
    report.details = req.body.details;
    report.recommendations = req.body.recommendations;
    report.gate = req.body.gate;
    report.plateNumber = req.body.plateNumber;
    report.incident = req.body.incident;
    report.damageItems = req.body.damageItems;
    report.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      report.imageUrl = imageUrl;
    }

    await report.save();
    res.status(200).send(report);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  getMyReport,
  createMyReport,
  updateMyReport,
};
