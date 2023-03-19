import Eventlist from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-util";
// import { getFeaturedEvents } from "@/dummy-data"

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents()
  const { events } = props;

  return (
    <div>
      <Eventlist items={events} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800
  };
}
