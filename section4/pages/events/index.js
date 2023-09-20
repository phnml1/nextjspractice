import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/event/event-list";
import EventSearch from "@/components/event/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEventPage() {
  const events = getAllEvents();
  const router =  useRouter();
  function findEventsHandler(year,month) {
    const fullpath = `/events/${year}/${month}`
    router.push(fullpath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler}/>
      <EventList items={events} />
    </Fragment>
  );
}
export default AllEventPage;
