import express from "express";
import { param } from "express-validator";
import ReportController from "../controllers/ReportController";

const router = express.Router();

router.get(
  "/:reportId",
  param("reportId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("ReportId paramenter must be a valid string"),
  ReportController.getReport
);

router.get(
  "/search/:reportName",
  param("reportName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Report Name paramenter must be a valid string"),
  ReportController.searchReport
);

export default router;