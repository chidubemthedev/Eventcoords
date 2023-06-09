import Eventlist from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import { getAllEvents } from "@/helpers/api-util";
import Head from "next/head";
// import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year, month) => {
    console.log(year, month);
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
    <Head>
        <title>All Events</title>
        <meta name="description" content="Event for meetups." />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <Eventlist items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
