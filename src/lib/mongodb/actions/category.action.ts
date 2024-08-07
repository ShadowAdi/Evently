"use server";

import { handleError } from "@/lib/utils";
import { CreateCategoryParams } from "../../../../types";
import { ConnectToDatabse } from "../database";
import Category from "../database/models/Category.models";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await ConnectToDatabse();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};



export const getAllCategory = async () => {
    try {
      await ConnectToDatabse();
      const categories = await Category.find();
      return JSON.parse(JSON.stringify(categories));
    } catch (error) {
      handleError(error);
    }
  };
  