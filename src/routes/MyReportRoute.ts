import express from "express";
import multer from "multer";
import MyReportController from "../controllers/MyReportController";
import { validateMyReportRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

// GET /api/my/report
router.get("/", jwtCheck, jwtParse, MyReportController.getMyReport);

// POST /api/my/report
router.post("/",
  upload.single("imageFile"),
  validateMyReportRequest,
  jwtCheck,
  jwtParse, 
  MyReportController.createMyReport
  );

// UPDATE /api/my/report
// router.put("/",
//   upload.single("imageFile"),
//   validateMyReportRequest,
//   jwtCheck,
//   jwtParse, 
//   MyReportController.updateMyReport
//   );


router.put(  "/:reportId",
  param("reportId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("ReportId paramenter must be a valid string"),
  upload.single("imageFile"),
  validateMyReportRequest,
  jwtCheck,
  jwtParse, 
  MyReportController.updateMyReport
  );

export default router;
