"use server";

import { connectToDatabase } from "@/lib/database";
import mongoose from "mongoose";
import { handleError } from "../utils";

export async function getPendingOrdersByUser({ userId, limit = 10, page }) {
  try {
    await connectToDatabase();

    const conditions = {
      connector: new mongoose.Types.ObjectId(userId),
      active: true,
    };
    const skipAmount = (page - 1) * limit;

    const db = mongoose.connection.db;

    const collection = db.collection("pending_orders");

    const pendingOrders = await collection
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .toArray();

    const plainPendingOrders = pendingOrders.map((order) =>
      JSON.parse(JSON.stringify(order))
    );
    return plainPendingOrders;
  } catch (error) {
    handleError(error);
  }
}
