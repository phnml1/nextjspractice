import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';
function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isfetchingComments, setIsFetchingComments] = useState(false);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  console.log(isfetchingComments);
  useEffect(()=>{
    if(showComments) {
      setIsFetchingComments(true);
      fetch('/api/comments/'+eventId).then(response => response.json()).then(
        data => {setComments(data.comments)
          setIsFetchingComments(false)

          }

      );
    }
   },[showComments])

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending Comments...',
      message: 'Your comment is currently being stored into a database',
      status:'pending',
    })
    // send data to API
    fetch(`/api/comments/${eventId}`,{
      method:'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response)=> response.json())
      .then((data)=>{
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved! ',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isfetchingComments && <CommentList items = {comments}/>}
      {showComments && isfetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
