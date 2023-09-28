import EventList from "@/components/event/event-list";
import EventSearch from "@/components/event/event-search";
import Head from "next/head";

import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-util";

function AllEventPage(props) {
  const { events } = props;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content = "find a lot of great events" />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
export default AllEventPage;
