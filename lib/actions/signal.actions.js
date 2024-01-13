"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import SignalCategory from "@/lib/database/models/signalCategory.model";
import { handleError } from "@/lib/utils";
import Signal from "../database/models/signal.model";

const getSignalCategoryByName = async (name) => {
  return SignalCategory.findOne({ name: { $regex: name, $options: "i" } });
};

const populateSignal = (query) => {
  return query
    .populate({
      path: "sender",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "signal-category",
      model: SignalCategory,
      select: "_id name",
    });
};

// CREATE
export async function createSignal({ userId, signal, path }) {
  try {
    await connectToDatabase();

    const sender = await User.findById(userId);
    if (!sender) throw new Error("Sender not found");
    const newSignal = await Signal.create({
      ...signal,
      signalCategory: signal.signalCategoryId,
      sender: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newSignal));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE SIgnal BY ID
export async function getSignalById(signalId) {
  try {
    await connectToDatabase();

    const signal = await populateSignal(Signal.findById(signalId));

    if (!signal) throw new Error("Signal not found");

    return JSON.parse(JSON.stringify(signal));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateSignal({ userId, signal, path }) {
  try {
    await connectToDatabase();

    const signalToUpdate = await Signal.findById(signal._id);
    if (!signalToUpdate || signalToUpdate.sender.toHexString() !== userId) {
      throw new Error("Unauthorized or signal not found");
    }

    const updatedSignal = await Signal.findByIdAndUpdate(
      signal._id,
      { ...signal, signalCategory: signal.signalCategoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedSignal));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteSignal({ signalId, path }) {
  try {
    await connectToDatabase();

    const deletedSignal = await Signal.findByIdAndDelete(signalId);
    if (deletedSignal) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL SIGNAL
export async function getAllSignals({
  query,
  limit = 6,
  page,
  signalCategory,
}) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { name: { $regex: query, $options: "i" } }
      : {};
    const signalCategoryCondition = signalCategory
      ? await getSignalCategoryByName(signalCategory)
      : null;

    const conditions = {
      $and: [
        nameCondition,
        signalCategoryCondition
          ? { signalCategory: signalCategoryCondition._id }
          : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const signalsQuery = Signal.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const signals = await populateSignal(signalsQuery);
    const signalsCount = await Signal.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(signals)),
      totalPages: Math.ceil(signalsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET POSTS BY ORGANIZER
export async function getSignalsByUser({ userId, limit = 100, page }) {
  try {
    await connectToDatabase();

    const conditions = { sender: userId };
    const skipAmount = (page - 1) * limit;

    const signalsQuery = Signal.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const signals = await populateSignal(signalsQuery);
    const signalsCount = await Signal.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(signals)),
      totalPages: Math.ceil(signalsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED POSTS: POSTS WITH SAME CATEGORY
export async function getRelatedSignalsBySignalCategory({
  signalCategoryId,
  signalId,
  limit = 3,
  page = 1,
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ signalCategory: signalCategoryId }, { _id: { $ne: signalId } }],
    };

    const signalsQuery = Signal.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const signals = await populateSignal(signalsQuery);
    const signalsCount = await Signal.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(signals)),
      totalPages: Math.ceil(signalsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
