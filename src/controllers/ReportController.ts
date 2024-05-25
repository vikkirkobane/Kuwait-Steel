import { Request, Response } from "express";
import Report from "../models/report";

const searchReport = async (req: Request, res: Response) => {
  try {
    const reportName = req.params.reportName;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedIncident = (req.query.selectedIncident as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["reportName"] = new RegExp(reportName, "i");
    const cityCheck = await Report.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedIncident) {
      const incidentArray = selectedIncident
        .split(",")
        .map((incident) => new RegExp(incident, "i"));

      query["incident"] = { $all: incidentArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { incident: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const report = await Report.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Report.countDocuments(query);

    const response = {
      data: report,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  //getRestaurant,
  searchReport,
};