import { Fragment } from "react";
import MeetupDetail from '@/components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <>
    <MeetupDetail />
    <Fragment>
    </Fragment>
    </>
  )
}

export function getStaticPaths() {
  return {
    // 지원하는 매개변수 값이 모두 있는지(false) 혹은 일부만 있는지(true)
    // 방문이 잦은 페이지만 사전렌더링 되도록 만들기 가능
    fallback: false,
    // 보통은 하드코딩x
    paths: [
      { params: {
        meetupid: 'm1'
      } 
    },
    {
    params: {
      meetupid: 'm2'
    }
  },
    ]
  }
}
export async function getStaticProps(context) {
  
  const meetupId = context.params.meetupid;

  return {
    props: {
      meetupData: {
        image: '',
        id: meetupId,
        title : "First MeetUp",
        address: "Some Street 5, Some city",
        description: "this is a first meetup"
      }
    }
  }
}
export default MeetupDetails;