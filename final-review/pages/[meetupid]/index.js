import { Fragment } from "react";
import MeetupDetail from '@/components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
      <title>{props.meetupData.title}</title>
      <meta name = "description"
      content = {props.meetupData.description} />
    </Head>
    <MeetupDetail image = {props.meetupData.image} title = {props.meetupData.title} address = {props.meetupData.address} description = {props.meetupData.description}/>
    
    </Fragment>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://yuju0903:<password>@cluster0.usugtsx.mongodb.net/meetup?retryWrites=true&w=majority')
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  // id만 가져옴 (첫번째 매개변수는 조건, 두번째는 포함하는 필드)
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    // 지원하는 매개변수 값이 모두 있는지(false) 혹은 일부만 있는지(true)
    // 방문이 잦은 페이지만 사전렌더링 되도록 만들기 가능
    //true(즉시 빈페이지 생성하고 데이터)나 blocking이면 (그전에 아무것도 보지못하다가 완성된 페이지로)
    fallback: 'blocking',
    // 
    paths: meetups.map((meetup) => ({
      params: {meetupid: meetup._id.toString()},
  })),
  };
}
export async function getStaticProps(context) {
  
  const meetupId = context.params.meetupid;

  const client = await MongoClient.connect(
    'mongodb+srv://yuju0903:<password>@cluster0.usugtsx.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        title : selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      }
    }
  }
}
export default MeetupDetails;