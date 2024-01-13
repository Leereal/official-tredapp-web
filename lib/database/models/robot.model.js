import { symbolSchema } from "@/lib/validator";
import { Schema, model, models } from "mongoose";

const RobotSchema = new Schema({
  name: { type: String },
  version: { type: String },
  description: { type: String },
  strategy: { type: String },
  active: { type: Boolean },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  symbols: [{ name: { type: String }, active: { type: Boolean } }],
  socket: { type: String },
});

const Robot = models.Robot || model("Robot", RobotSchema);

export default Robot;
