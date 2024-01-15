"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import Connection from "@/lib/database/models/connection.model";
import { handleError } from "@/lib/utils";
import Account from "../database/models/account.model";
import Robot from "../database/models/robot.model";

export async function getDashboardData() {
  try {
    await connectToDatabase();

    const members = await User.countDocuments({});
    return {
      members,
    };
  } catch (error) {
    handleError(error);
  }
}
