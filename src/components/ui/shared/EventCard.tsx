import { IEvent } from "@/lib/mongodb/database/models/Event.model";
import { formatDateTime } from "@/lib/utils";
import { auth, Session } from "@clerk/nextjs/server";
import { ArrowBigRight, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type EventCardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const EventCard = ({ event, hidePrice, hasOrderLink }: EventCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreated = userId === event?.organizer?._id.toString();
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        style={{ backgroundImage: `url(${event?.imageUrl})` }}
        href={"/events/" + event?._id}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500 "
      />

      {isEventCreated && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col rounded-l shadow-sm gap-4 bg-white p-3 transition-all">
          <Link href={`/events/${event?._id}/update`}>
            <Edit width={20} height={20} />
          </Link>
          <DeleteConfirmation eventId={event?._id} />
        </div>
      )}

      <div className="flex min-h-[230px] gap-3 flex-col p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2 ">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
              {event?.isFree ? "FREE" : `$${event?.price}`}
            </span>
            <p className="p-semibold-14  w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500  line-clamp-1">
              {event?.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-gray-500 ">
          {formatDateTime(event?.startDateTime).dateTime}
        </p>
        <Link href={`/events/${event?._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event?.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600 ">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link className="flex gap-2" href={`/orders?eventId=${event?._id}`}>
              <p className="text-primary-500">Order Details</p>
              <ArrowBigRight width={20} height={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
