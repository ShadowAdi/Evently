"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrlQuery = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrlQuery, { scroll: false });
  };
  return (
    <div className="flex gap-2 ">
      <Button
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => onClick("prev")}
        variant={"outline"}
        size={"lg"}
      >
        Previous
      </Button>
      <Button
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => onClick("next")}
        variant={"outline"}
        size={"lg"}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
