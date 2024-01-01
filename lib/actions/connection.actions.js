"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import Connection from "@/lib/database/models/connection.model";
import { handleError } from "@/lib/utils";
import Account from "../database/models/account.model";
import Robot from "../database/models/robot.model";

const getCategoryByName = async (name) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateConnection = (query) => {
  return query
    .populate({
      path: "connector",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" })
    .populate({
      path: "account",
      model: Account,
      select: "_id account_name balance",
    })
    .populate({ path: "robot", model: Robot, select: "_id name version" });
};

// CREATE
export async function createConnection({ userId, connection, path }) {
  try {
    await connectToDatabase();

    const connector = await User.findById(userId);
    if (!connector) throw new Error("Connector not found");
    const newConnection = await Connection.create({
      ...connection,
      category: connection.categoryId,
      connector: userId,
      account: connection.accountId,
      robot: connection.robotId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newConnection));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE CONNECTION BY ID
export async function getConnectionById(connectionId) {
  try {
    await connectToDatabase();

    const connection = await populateConnection(
      Connection.findById(connectionId)
    );

    if (!connection) throw new Error("Connection not found");

    return JSON.parse(JSON.stringify(connection));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateConnection({ userId, connection, path }) {
  try {
    await connectToDatabase();

    const connectionToUpdate = await Connection.findById(connection._id);

    if (
      !connectionToUpdate ||
      connectionToUpdate.connector.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or connection not found");
    }

    const updatedConnection = await Connection.findByIdAndUpdate(
      connection._id,
      {
        ...connection,
        category: connection.categoryId,
        robot: connection.robotId,
      },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedConnection));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteConnection({ connectionId, path }) {
  try {
    await connectToDatabase();

    const deletedConnection = await Connection.findByIdAndDelete(connectionId);
    if (deletedConnection) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL CONNECTIONS
export async function getAllConnections({ query, limit = 6, page, category }) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { name: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        nameCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET CONNECTIONS BY ORGANIZER
export async function getConnectionsByUser({ userId, limit = 6, page }) {
  try {
    await connectToDatabase();

    const conditions = { connector: userId };
    const skipAmount = (page - 1) * limit;

    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED CONNECTIONS: CONNECTIONS WITH SAME CATEGORY
export async function getRelatedConnectionsByCategory({
  categoryId,
  connectionId,
  limit = 3,
  page = 1,
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: connectionId } }],
    };

    const connectionsQuery = Connection.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const connections = await populateConnection(connectionsQuery);
    const connectionsCount = await Connection.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(connections)),
      totalPages: Math.ceil(connectionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
