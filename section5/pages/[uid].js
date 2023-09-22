function UserIdPage(props) {
    return <h1>{props.id}</h1>
}
export default UserIdPage;

//서버에서 작동하므로, 사전생성 자체가 필요하지않음 (<-> getStaticProps)
//서버사이드코드에서 모두처리
export async function getServerSideProps(context) {
    const {params} = context;
    const userId = params.uid;
    console.log('Server side code')
    return {
        props:{
            id: 'userid-' + userId,
        }
    }
}