import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";
function FeedbackPage(props) {
    const [feedbackData,setFeedbackData] = useState();
    function loadFeedbackHandler(id) {
        fetch(`/api/feedback/${id}`).then((response) => response.json()).then((data) => {
            setFeedbackData(data.feedback);
            console.log(data);
        });
    }
    return (
    <Fragment>{feedbackData && <p>{feedbackData.email}</p>}
    <ul>
        {props.feedbackItems.map((item)=>(
            <li key={item.id}>{item.text}<button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button></li> 
        ))}
    </ul>
    </Fragment>
    );
}

//외부 api가 아니므로 바로 fetch하면안됨
// getServerSideProps도 가능
export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        }
    }
}
export default FeedbackPage;