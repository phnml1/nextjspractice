import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import EventList from "@/components/event/event-list";
import Head from "next/head";
import { Fragment } from "react";
import ResultsTitle from "@/components/event/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
//클라이언트 사이드 페칭도 적합 빠르게 이동하는게 중요하고, 검색엔진에 뜰필요도없음
function FilteredEventsPage(props) {
  // const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">loading...</p>;
  // }

  // const filterdYear = filterData[0];
  // const filterdMonth = filterData[1];

  // const numYear = +filterdYear;
  // const numMonth = +filterdMonth;
  let pageHeadData = (
    <Head>
      <title>NextJS Events</title>
      <meta
        name="description"
        content={`A list of filtered events.`}
      />
    </Head>
  )
  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData} 
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
    pageHeadData = (
    <Head>
      <title>NextJS Events</title>
      <meta
        name="description"
        content={`All Events ${props.date.month - 1}/${props.date.year}.`}
      />
    </Head>
  );
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
        {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
//유입된 모든 요청에 즉시 사전렌더링
export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

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
    return {
      props: { hasError: true },
      // notFound:true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
export default FilteredEventsPage;
