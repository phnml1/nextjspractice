import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import EventList from "@/components/event/event-list";
import { Fragment } from "react";
import ResultsTitle from "@/components/event/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">loading...</p>;
  }

  const filterdYear = filterData[0];
  const filterdMonth = filterData[1];

  const numYear = +filterdYear;
  const numMonth = +filterdMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return(
    <Fragment>
        <ErrorAlert>
      <p>Invalid filter. please adjust your values!</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>);
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
        <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
export default FilteredEventsPage;
