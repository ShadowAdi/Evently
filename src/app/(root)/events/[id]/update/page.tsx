import EventForm from "@/components/ui/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { SearchParamProps } from "../../../../../../types";
import { getEventById } from "@/lib/mongodb/actions/event.action";

const UpdateEvent = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper  h3-bold  text-center sm:text-left ">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type="Update"
          event={event}
          eventId={event?._id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
