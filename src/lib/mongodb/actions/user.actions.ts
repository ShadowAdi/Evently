"use server";

import { handleError } from "@/lib/utils";
import { CreateUserParams, UpdateUserParams } from "../../../../types";
import { ConnectToDatabse } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/Event.model";
import Order from "../database/models/Orders.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    await ConnectToDatabse();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await ConnectToDatabse();
    const updatedUser = await User.findByIdAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updateUser) {
      throw new Error("User update failed");
    }
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await ConnectToDatabse();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      throw new Error("User deletion failed");
    }
    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        {
          $unset: { buyer: 1 },
        }
      ),
    ]);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
  } catch (error) {
    handleError(error);
  }
};


export const getSingleUser=async (userId:string)=>{
    try {
        await ConnectToDatabse();
        const user=await User.findById(userId)
        if (!user) {
            throw new Error("User Not Found")
        }
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}