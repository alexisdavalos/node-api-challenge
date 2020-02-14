import React from 'react'
import Post from './Post'

const PostsWrapper = (props) =>{
    console.log('Props In Wrapper:',props)
    return(
        <>
         <h3>Projects In Database:</h3>
            <div className='usersWrapper'>
                {(props.posts) ? Object.values(props.posts).map(post=>(
                     <Post setFetch={props.setFetch} key={post.id} post={post} newPost={props.newPost} setNewPost={props.setNewPost} updatePost={props.updatePost} setUpdate={props.setUpdate} />
                )) : (<div></div>)}
            </div>
        </>
    )
}

export default PostsWrapper;