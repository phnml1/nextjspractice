import Head from 'next/head';
import EventList from '@/components/event/event-list'
import { getFeaturedEvents } from '@/helpers/api-util'
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" contents = "find a lot of great events" />
      </Head>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents 
    },
    revalidate: 600
  }
}
export default HomePage;