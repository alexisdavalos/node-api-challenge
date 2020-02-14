import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Post = (props) =>{
    const [userPosts, setUserPosts] = useState();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/projects/${props.post.id}`)
        .then(res => setUserPosts(res.data.data))
        .catch(err => console.log(err))
    },[])
    console.log('Project Actions:', userPosts);
    // console.log('Props Inside Post.js:', props)
    const handleDelete = (e) =>{
        console.log('deleting...', props.post)
        e.preventDefault();
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/projects/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        props.setUpdate({...props.post})
    }

    return(
        <div className='user'>
            <h5>{props.post.name}</h5>
            <p><b>Description:</b> {props.post.description}</p>
            <p>Completed: {(props.post.completed) ? 'True' : 'False'}</p>
            <button className='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
            <button onClick={(e) => handleUpdate(e)}>Update</button>
            <div className='userPosts'>
                {(userPosts) ?
                userPosts.map(post => (
                    <div key={post.id}>
                        <h3>Action Names:</h3>
                        <li>{post.description}</li>
                    </div>
                )) :
                <div><h2>No Actions Available</h2></div>    
            }
            </div>
        </div>
    )
}

export default Post;