import mongoose from "mongoose";

const damageItemSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  price: { type: Number, required: true },
});

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reportName: { type: String, required: true },
  details: { type: String, required: true },
  recommendations: { type: String, required: true },
  gate: { type: Number, required: true },
  plateNumber: { type: Number, required: true },
  incident: [{ type: String, required: true }],
  damageItems: [damageItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
