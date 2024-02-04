import React from 'react'
import Comment from './Comment'

function CommentList(props) {
    const {data,postId} = props;
    return (
        <div>
           {
            data !== '' ? 
                data.map((comment,i)=>{
                    return <Comment key={i} name={comment.name} userId={comment.userId} fetchPostData={props.fetchPostData} commentId={comment.id} postId={postId} description={comment.description} />
                }) : 
                null
           }
        </div>
    )
}

export default CommentList
