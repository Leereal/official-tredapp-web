import { Schema, model, models } from "mongoose";

const ConnectionSchema = new Schema(
  {
    connector: { type: Schema.Types.ObjectId, ref: "User" },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    robot: { type: Schema.Types.ObjectId, ref: "Robot" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    payout: { type: Number },
    stake: { type: Number },
    expiration: { type: Number },
    current_level: { type: Number },
    martingale: { type: Boolean },
    target_percentage: { type: Number },
    active: { type: Boolean },
    target_reached: { type: Boolean },
    open_trade: { type: Boolean },
    active_contract_id: { type: Number },
    last_profit: { type: Number },
    entry: { type: String },
    currency: { type: String },
    dynamic_stake: { type: Boolean },
    stop_loss: { type: Number },
    stake_percentage: { type: Number },
    risk_type: { type: String },
    risk_percentage: { type: Number },
  },
  {
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

const Connection = models.Connection || model("Connection", ConnectionSchema);

export default Connection;
