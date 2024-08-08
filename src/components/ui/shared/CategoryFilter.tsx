"use client";

import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategory } from "@/lib/mongodb/actions/category.action";
import { ICategory } from "@/lib/mongodb/database/models/Category.models";
const CategoryFilter = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();
      categoryList && setCategory(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  //   useEffect(() => {
  //     const delayDebounceFn = setTimeout(() => {
  //       let newUrl = "";
  //       if (category) {
  //         newUrl = formUrlQuery({
  //           params: searchParams.toString(),
  //           key: "query",
  //           value: category,
  //         });
  //       } else {
  //         newUrl = removeKeysFromQuery({
  //           params: searchParams.toString(),
  //           keysToRemove: ["query"],
  //         });
  //       }
  //       router.push(newUrl, { scroll: false });
  //     }, 300);
  //     return () => clearTimeout(delayDebounceFn);
  //   }, [category, searchParams, router]);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {category?.map((cate, i) => {
          return (
            <SelectItem
              key={i}
              value={cate.name}
              className="select-item p-regular-14"
            >
              {cate.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
