import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';



function HomePage(props) {
  
  return (
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name = "description"
      content = "Brouse a huge list of highly active React meetups" />
    </Head>
  <MeetupList meetups = {props.meetups} />
  
  </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }
// 빌드 프로세스시에만 실행되는 코드(revalidate없을 시)
export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect('mongodb+srv://yuju0903:qwer1234@cluster0.usugtsx.mongodb.net/meetup?retryWrites=true&w=majority')
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}
export default HomePage;