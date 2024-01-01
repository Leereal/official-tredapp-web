export const headerLinks = [
  { title: "Features", path: "/" },
  { title: "Integrations", path: "/" },
  { title: "Customers", path: "/" },
  { title: "Pricing", path: "/" },
];
export const robotDefaultValues = {
  name: "",
  version: "",
  description: "",
  strategy: "",
  active: true,
  categoryId: "",
  symbols: [],
};

export const accountDefaultValues = {
  account_name: "",
  email: "",
  token: "",
  active: true,
  balance: 0,
  opening_balance: 0,
};

export const connectionDefaultValues = {
  accountId: "",
  robotId: "",
  categoryId: "",

  payout: 0,
  stake: 0.45,
  currency: "",

  expiration: 0,
  current_level: 1,
  active_contract_id: 0,

  last_profit: 0,
  target_percentage: 0,
  entry: "",

  martingale: true,
  active: false,
  target_reached: false,
  open_trade: false,
  dynamic_stake: false,

  stop_loss: 0,
  stake_percentage: 0,
  risk_type: "FLAT",
  risk_percentage: 0,
};
