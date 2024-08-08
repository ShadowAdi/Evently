import Search from "@/components/ui/shared/Search";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersByEvent } from "@/lib/mongodb/actions/order.action";
import { SearchParamProps } from "../../../../types";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { IOrderItem } from "@/lib/mongodb/database/models/Orders.model";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
      </section>
      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>
      <section className="wrapper overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px] py-3 text-left">
                Order ID
              </TableHead>
              <TableHead className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </TableHead>
              <TableHead className="min-w-[150px] py-3 text-left">
                Buyer
              </TableHead>
              <TableHead className="min-w-[100px] py-3 text-left">
                Created
              </TableHead>
              <TableHead className="min-w-[100px] py-3 text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length === 0 ? (
              <TableRow className="border-b">
                <TableCell
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => {
                    console.log(row);

                    return (
                      <TableRow
                        key={row._id}
                        className="p-regular-14 lg:p-regular-16 border-b "
                        style={{ boxSizing: "border-box" }}
                      >
                        <TableCell className="min-w-[250px] py-4 text-primary-500">
                          {row._id}
                        </TableCell>
                        <TableCell className="min-w-[200px] flex-1 py-4 pr-4">
                          {row.eventTitle}
                        </TableCell>
                        <TableCell className="min-w-[150px] py-4">
                          {row.buyer}
                        </TableCell>
                        <TableCell className="min-w-[100px] py-4">
                          {formatDateTime(row.createdAt).dateTime}
                        </TableCell>
                        <TableCell className="min-w-[100px] py-4 text-right">
                          {formatPrice(row.totalAmount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Orders;
