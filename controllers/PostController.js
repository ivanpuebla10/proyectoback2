const Post = require("../models/Post");
const User = require("../models/User.js");

const PostController = {
  async create(req, res) {
    try {
      if (req.file) req.body.imagePost = req.file.filename;
      if (!req.body.title || !req.body.body) {
        return res.status(400).json({ msg: "Please fill in all the fields" });
      }
      const post = await Post.create({ ...req.body, userId: req.user._id });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "there was a problem creating the post" }); 
    }
  },

  async update(req, res) {
    try {
      if (req.file) req.body.imagePost = req.file.filename;
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "post successfully updated", post });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      await User.findByIdAndUpdate(
        post.userId,
        {
          $pull: {
            postIds: post._id
          },
        },
        { new: true } 
      );
      res.send({ post, message: "Post deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "there was a problem trying to remove the post" });
    }
  },

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .populate("comments.userId")
        .populate("likes.userId")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
    }
  },

  async getPostsByName(req, res) {
    try {
      const post = await Post.aggregate([
        {
          $match: {
            title: req.params.title,
          },
        },
      ]);
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },

  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },

  async insertComment(req, res) {
    try {
      if (req.file) req.body.image_path = req.file.filename;
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        {
          $push: {
            comments: {
              ...req.body,
              userId: req.user._id,
            },
          },
        },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with your comment" });
    }
  },

  //pasar ambos id del post y comment por parametros en vez de pasar el del comment por body
  async updateComment(req, res) {
    try {
      req.file ? req.body.image = req.file.filename : req.body.image = ''
      const post = await Post.findByIdAndUpdate(req.params._id, {
        $pull: { comments: { _id: req.body._id } },
      });
      const comment = await Post.findByIdAndUpdate(
        post._id,
        { $push: { comments: { ...req.body, userId: post.userId, _id: req.body._id } } },
        { new: true }
      );
      res.send({ message: "Review actualizada correctamente", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar la review" });
    }
  },

  async deleteComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        {
          $pull: {
            comments: {
              _id: req.body._id,
            },
          },
        },
        { new: true } 
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem deleting your comment" });
    } 
  },

  async like(req, res) {
    try {
      const found = await Post.findById(req.params._id);
      if ( !found.likes.includes(req.user._id)) {
        const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { likes: req.user._id } },
            { new: true }
          );
      res.send(post);
        }
        else {
          res.status(400).send({ message: "you already liked this post" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  },
  

async deslike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your deslike" });
    }
  },
};
module.exports = PostController;
