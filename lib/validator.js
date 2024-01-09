import * as z from "zod";
const symbolSchema = z.object({
  name: z.string(),
  active: z.boolean(),
});
export const robotFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .max(500, {
      message: "Description must be at most 500 characters.",
    }),
  version: z
    .string()
    .min(2, {
      message: "Version must be at least 2 characters.",
    })
    .max(10, {
      message: "Version must be at most 500 characters.",
    }),
  strategy: z.string().optional(),
  active: z.boolean(),
  categoryId: z.string(),
  symbols: z.array(symbolSchema).optional(),
});
export const accountFormSchema = z.object({
  account_name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  token: z
    .string()
    .min(3, {
      message: "Token must be at least 3 characters.",
    })
    .max(500, {
      message: "Token must be at most 500 characters.",
    }),
  balance: z.coerce.number().gte(0, "Balance must be more than or equal 0"),
  opening_balance: z.coerce
    .number()
    .gte(0, "Opening Balance must be more than or equal 0"),
  active: z.boolean(),
  account_type: z.string().min(2, {
    message: "Account Type must be at least 2 characters.",
  }),
});
export const connectionFormSchema = z.object({
  accountId: z.string(),
  robotId: z.string(),
  categoryId: z.string(),
  payout: z.coerce.number().gte(0, "Payout must be more than or equal 0"),
  stake: z.coerce.number().gte(0.35, "Stake must be more than or equal 0"),
  expiration: z.coerce
    .number()
    .gte(0, "Expiration must be more than or equal 0"),
  current_level: z.coerce.number().gte(1, "Level must be more than or equal 1"),
  martingale: z.boolean(),
  target_percentage: z.coerce
    .number()
    .gte(0, "Target must be more than or equal 0"),
  active: z.boolean(),
  target_reached: z.boolean(),
  open_trade: z.boolean(),
  active_contract_id: z.coerce.number(),
  last_profit: z.coerce.number(),
  entry: z.string().optional(),
  currency: z.string().min(2, {
    message: "Currency must be at least 3 characters.",
  }),
  dynamic_stake: z.boolean(),
  stop_loss: z.coerce.number(),
  stake_percentage: z.coerce.number(),
  risk_type: z.string().min(2, {
    message: "Risk Type must be at least 2 characters.",
  }),
  risk_percentage: z.coerce.number(),
});
