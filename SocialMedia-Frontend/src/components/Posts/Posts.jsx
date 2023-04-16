import React, { useEffect, useState } from 'react'
import './Posts.css'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getTimelinePosts } from '../../redux/apiCalls'

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.currentUser);
  // console.log(user.newUser._id); 
  const {posts,isFetching} = useSelector((state)=>state.post);
  
  // reverse the posts array
  const reversedPosts = posts.slice().reverse();

  
  
  useEffect(() => {
    async function fetchData() {
       await getTimelinePosts(dispatch, user.user._id);
      
    }
    fetchData();
  }, [user.user._id]);
  if(posts.length == 0) return 'No Posts';
  return (
    <div className="Posts">
        {isFetching?"Fetching Posts...":reversedPosts.map((post, id)=>{
          // console.log(post)
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts