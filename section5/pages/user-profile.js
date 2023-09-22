function UserProfilePage(props){
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

//server에서만 
export async function getServerSideProps(context) {
    //context는 request 객체전체에 접근도 가능
    const {params,req, res} = context;

    console.log(req);
    console.log(res);
    return {
        props: {
            username: 'Max'
        }
    }
}