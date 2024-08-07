"use client";
import { IEvent } from "@/lib/mongodb/database/models/Event.model";
import { SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3 ">
      {hasEventFinished ? (
        <>
          <p className="p-2 text-red-500">
            Sorry, Tickets are no longer available.
          </p>
        </>
      ) : (
        <>
          <SignedOut>
            <Button asChild size={"lg"} className="button rounded-full">
              <Link href={"/sign-in"}>Get Tickets</Link>
            </Button>
          </SignedOut>
          <Checkout userId={userId} event={event}/>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;