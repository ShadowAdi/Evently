import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import Search from "@/components/ui/shared/Search";
import { getAllEvents } from "@/lib/mongodb/actions/event.action";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "../../../types";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  const pageNumber = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: pageNumber,
    limit: 3,
  });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex gap-8 flex-col md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted By <br /> Thousands of Events{" "}
        </h2>
        <div className="flex w-full gap-5 md:flex-row flex-col">
          <Search />
          <CategoryFilter/>
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          collectionType="All_Events"
          limit={3}
          page={pageNumber}
          totalPages={events?.totalPages}
          emptyStateSubtext="Come back later"
        />
      </section>
    </>
  );
}
