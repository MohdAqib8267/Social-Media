import mongoose from "mongoose";
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

//create a new post
export const createPost = async(req,res)=>{
    
   
    const newPost = new PostModel(req.body);
  
   
    try {
       const result= await newPost.save();
        res.status(200).json(result);
    } catch (error) {
        req.status(500).json(error);
        
    }
}

//get Post 
export const getPost=async(req,res)=>{
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

//update post
export const updatePost = async(req,res)=>{
    const postId = req.params.id;

    const {userId} = req.body;
    try {
        const post = await PostModel.findById(postId);
        if( post.userId === userId){
            
            
            await post.updateOne({$set : req.body})
            res.status(200).json("Post Updated!");
        }
        else{
            res.status(403).json("Action Forbidden!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete Post
export const deletePost = async(req,res)=>{

    const postId = req.params.id;

    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId){
            await PostModel.deleteOne()
            res.status(200).json("post Deleted Successfully!")
        }
        else{
            res.status(403).json("Action Forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  //Get TimeLine Post
export const getTimelinePost =async(req,res)=>{
    const userId = req.params.id;

    try {
        const currentUserPosts = await PostModel.find({userId: userId});
        const followingPost = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPost"
                }
            },
            {
                $project:{
                    followingPost: 1,
                    _id: 0
                }
            }

        ])

        // res.status(200).json(currentUserPosts.concat(followingPost));
        res.status(200).json(currentUserPosts.concat(...followingPost[0].followingPost).sort((a,b)=>{
           return  b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error);
    }
}