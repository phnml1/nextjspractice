import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: '',
    address: 'Some address 5, 12345 some city',
    description:'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: '',
    address: 'Some address 10, 12345 some city',
    description:'This is a second meetup!'
  },
]

function HomePage(props) {
  
  return <MeetupList meetups = {props.meetups} />
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
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 1
  };
}
export default HomePage;