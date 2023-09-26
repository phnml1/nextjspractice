import { getEventById } from "@/helpers/api-util";
import { useRouter } from "next/router";

import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { getAllEvents } from "@/helpers/api-util";
function EventDetailPage(props) {
  const router = useRouter();

  const eventId = router.query.eventid;
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>No events found</p>
      </div>
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
//늘변경되는 데이터가아니므로 사전생성만
export async function getStaticProps(context) {
  const eventId = context.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: paths,
    //본래페이지보다 더많이 생성할것이라고 알려줌
    fallback: "blocking",
    //'blocking'은 완료될때까지 아무것도하지않음(<-> true)
  };
}
export default EventDetailPage;
