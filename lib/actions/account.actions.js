"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import Account from "../database/models/account.model";

const populateAccount = (query) => {
  return query.populate({
    path: "owner",
    model: User,
    select: "_id firstName lastName",
  });
};

// CREATE
export async function createAccount({ userId, account, path }) {
  try {
    await connectToDatabase();

    const owner = await User.findById(userId);
    if (!owner) throw new Error("Owner not found");
    const newAccount = await Account.create({
      ...account,
      owner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newAccount));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE ACCOUNT BY ID
export async function getAccountById(accountId) {
  try {
    await connectToDatabase();

    const account = await populateAccount(Account.findById(accountId));

    if (!account) throw new Error("Account not found");

    return JSON.parse(JSON.stringify(account));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateAccount({ userId, account, path }) {
  try {
    await connectToDatabase();

    const accountToUpdate = await Account.findById(account._id);
    if (!accountToUpdate || accountToUpdate.owner.toHexString() !== userId) {
      throw new Error("Unauthorized or account not found");
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      account._id,
      { ...account },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedAccount));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteAccount({ accountId, path }) {
  try {
    await connectToDatabase();

    const deletedAccount = await Account.findByIdAndDelete(accountId);
    if (deletedAccount) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL ACCOUNTS
export async function getAllAccounts({ query, limit = 6, page }) {
  try {
    await connectToDatabase();

    const accountNameCondition = query
      ? { account_name: { $regex: query, $options: "i" } }
      : {};
    const conditions = {
      $and: [accountNameCondition],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const accountsQuery = Account.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const accounts = await populateAccount(accountsQuery);
    const accountsCount = await Account.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(accounts)),
      totalPages: Math.ceil(accountsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET ACCOUNTS BY OWNER
export async function getAccountsByUser({ userId, limit = 6, page }) {
  try {
    await connectToDatabase();

    const conditions = { owner: userId };
    const skipAmount = (page - 1) * limit;

    const accountsQuery = Account.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const accounts = await populateAccount(accountsQuery);
    const accountsCount = await Account.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(accounts)),
      totalPages: Math.ceil(accountsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
