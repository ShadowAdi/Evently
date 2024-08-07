import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import { getEventsByUser } from "@/lib/mongodb/actions/event.action";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({
    userId: userId,
    page: 1,
  });
  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center bg-dotted-pattern py-5 md:py-10">
        <div className="flex items-center justify-center sm:justify-between  wrapper">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex ">
            <Link href={"/#events"}>Explore More Event</Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No Event tickets purchased yet"
          emptyStateSubtext="No Worries - plenty of exciting events to explore"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="ordersPage"
        />
      </section> */}

      <section className="bg-primary-50 bg-cover bg-center bg-dotted-pattern py-5 md:py-10">
        <div className="flex items-center justify-center sm:justify-between  wrapper">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex ">
            <Link href={"/events/create"}>Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Event_Organized"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
