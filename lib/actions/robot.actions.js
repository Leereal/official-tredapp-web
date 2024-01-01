"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";
import Robot from "../database/models/robot.model";

const getCategoryByName = async (name) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateRobot = (query) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createRobot({ userId, robot, path }) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");
    const newRobot = await Robot.create({
      ...robot,
      category: robot.categoryId,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newRobot));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE ROBOT BY ID
export async function getRobotById(robotId) {
  try {
    await connectToDatabase();

    const robot = await populateRobot(Robot.findById(robotId));

    if (!robot) throw new Error("Robot not found");

    return JSON.parse(JSON.stringify(robot));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateRobot({ userId, robot, path }) {
  try {
    await connectToDatabase();

    const robotToUpdate = await Robot.findById(robot._id);
    if (!robotToUpdate || robotToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or robot not found");
    }

    const updatedRobot = await Robot.findByIdAndUpdate(
      robot._id,
      { ...robot, category: robot.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedRobot));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteRobot({ robotId, path }) {
  try {
    await connectToDatabase();

    const deletedRobot = await Robot.findByIdAndDelete(robotId);
    if (deletedRobot) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL POSTS
export async function getAllRobots({ query, limit = 6, page, category }) {
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
    const robotsQuery = Robot.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const robots = await populateRobot(robotsQuery);
    const robotsCount = await Robot.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(robots)),
      totalPages: Math.ceil(robotsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET POSTS BY ORGANIZER
export async function getRobotsByUser({ userId, limit = 6, page }) {
  try {
    await connectToDatabase();

    const conditions = { creator: userId };
    const skipAmount = (page - 1) * limit;

    const robotsQuery = Robot.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const robots = await populateRobot(robotsQuery);
    const robotsCount = await Robot.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(robots)),
      totalPages: Math.ceil(robotsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED POSTS: POSTS WITH SAME CATEGORY
export async function getRelatedRobotsByCategory({
  categoryId,
  robotId,
  limit = 3,
  page = 1,
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: robotId } }],
    };

    const robotsQuery = Robot.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const robots = await populateRobot(robotsQuery);
    const robotsCount = await Robot.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(robots)),
      totalPages: Math.ceil(robotsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
