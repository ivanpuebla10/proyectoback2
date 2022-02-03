const Post = require("../models/Post");
const User = require('../models/User.js');


const PostController ={
    async create(req,res){
        try {
            if(!req.body.title || !req.body.body){
                return res.status(400).json({msg:'Please fill in all the fields'})
            }
            
            const post = await Post.create({...req.body, userId: req.user._id})
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: post._id } })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem creating the post' })
        }
    },

    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
          res.send({ message: "post successfully updated", post });
        } catch (error) {
          console.error(error);
        }    
    },  

    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post' })
        }
    },

    async getAll(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const posts = await Post.find()
            .populate("comments.userId")
            .limit(limit * 1)
            .skip((page - 1) * limit);
          res.send(posts);
        } catch (error) {
          console.error(error);
        }
      },
    

    async getPostsByName(req, res) {
        try {
            const post = await Post.aggregate([{
                    $match: {
                        title:req.params.title
                    }
                }, ])
                res.send(post)
        } catch (error) {
            console.log(error)
        }
    },

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },

    async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { comments: { ...req.body, userId: req.user._id, userName: req.user.username } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your comment" });
        }
      },

    async like(req, res) {
        try {
          
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { liked: { ...req.body, userId: req.user._id, userName: req.user.username  } },
            },
            { new: true }
          )
          post.likes=post.liked.length;
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your like" });
        }
      },

      async deslike(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
          );
          post.liked = post.liked.filter((elem) = () =>{
              if(req.user._id.toString() !== elem.userId.toString()) {
                  return elem
              }});
          post.save()
          post.likes=post.liked.length;
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your deslike" });
        }
      },


}
module.exports = PostController;