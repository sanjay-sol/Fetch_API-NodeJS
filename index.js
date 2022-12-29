// const fetch = require('node-fetch');
// import nodemon from "nodemon";
import fetch from "node-fetch";
import mongoose, { mongo } from "mongoose";
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://sanju:'+process.env.MONGO_ATLAS_PWD+'@cluster0.dhwdoyq.mongodb.net/?retryWrites=true&w=majority");
const postSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
});
const Post = mongoose.model('Post',postSchema);
async function myPosts(){
   const posts =await fetch('https://jsonplaceholder.typicode.com/posts');
   const response = await posts.json();
//    console.log(response);
for(let i =0;i<response.length;i++)
{
   const post =new Post({
    user_id:response[i]['userId'],
    id:response[i]['id'],
    title:response[i]['title'],
    body:response[i]['body']
   });
   post.save();
}
}
myPosts();
