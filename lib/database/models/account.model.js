import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  account_name: { type: String },
  email: { type: String },
  token: { type: String },
  active: { type: Boolean },
  balance: { type: Number },
  opening_balance: { type: Number },
  account_type: { type: String },
});

const Account = models.Account || model("Account", AccountSchema);

export default Account;
