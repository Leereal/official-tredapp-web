import { Schema, model, models } from "mongoose";

const SignalCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const SignalCategory =
  models.SignalCategory || model("SignalCategory", SignalCategorySchema);

export default SignalCategory;
