import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if (!event) {
    return (
    <ErrorAlert>
    <p>No events found</p>
    </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        data={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export default EventDetailPage;
