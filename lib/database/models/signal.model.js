import { Schema, model, models } from "mongoose";

const SignalSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    robot: { type: Schema.Types.ObjectId, ref: "Robot" },
    signal_category: { type: Schema.Types.ObjectId, ref: "SignalCategory" },
    symbol: { type: String },
    entry_range: { type: String },
    stop_loss: { type: Number },
    take_profit_1: { type: Number },
    take_profit_2: { type: Number },
    take_profit_3: { type: Number },
    take_profit_4: { type: Number },
    take_profit_5: { type: Number },
    is_premium: { type: Boolean },
    is_active: { type: Boolean },
    profit: { type: Number },
  },
  {
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

const Signal = models.Signal || model("Signal", SignalSchema);

export default Signal;
