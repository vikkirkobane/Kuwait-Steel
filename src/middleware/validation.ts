import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next();
}

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyReportRequest = [
  body("reportName").notEmpty().withMessage("Report title is required"),
  
  body("details").notEmpty().withMessage("Details are required"),
  
  body("recommendations").notEmpty().withMessage("Recommendations are required"),
  
  body("gate")
    .isInt({ min: 0 })
    .withMessage("Gate must be a positive integer"),
    
  body("plateNumber").isInt({ min: 0 }).withMessage("Plate number must be a positive integer"),

  body("incident")
    .isArray()
    .withMessage("Incident must be an array")
    .not()
    .isEmpty()
    .withMessage("Incident array cannot be empty"),

  body("damageItems")
    .isArray()
    .withMessage("Damaged items must be an array"),
    
  body("damageItems.*.name")
    .notEmpty()
    .withMessage("Damaged item name is required"),
    
  body("damageItems.*.price")
    .isFloat({ min:0 })
    .withMessage("Damaged item price is required and must be a positive number"),
  
  handleValidationErrors,
  
  ];