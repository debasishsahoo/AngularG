const PostModel = require("../models/postModel");
const mongoose = require('mongoose');

const PostCTRL = {
  getPosts: async (req, res, next) => {
    try {
      const AllPost = await PostModel.find();
      res.status(200).json({
        message: "All Post List",
        allPost: AllPost,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  getPostById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const SinglePost = await PostModel.findById(id);
      res.status(200).json({
        message: `Post of this ${id} found`,
        post: SinglePost,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  getPostBytime: async (req, res, next) => { },
  createPosts: async (req, res, next) => {
    const PostMsg = req.body;
    // req.id = "uuid1";
    const newPostMsg = new PostModel({
      ...PostMsg,
      createrid: req.body.creatorid,
      createdAt: new Date().toISOString(),
    });

    try {
      await newPostMsg.save();
      res.status(200).json({
        message: `New Post Created`,
        responsedata: newPostMsg,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  updatePosts: async (req, res, next) => {
    const { id } = req.params;
    const { title, body, tags, image, createrid } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          message: `No Post with id:${id}`,
        });
      }
      const UpdatePost = { title, body, tags, image, createrid, _id: id };
      await PostModel.findByIdAndUpdate(id, UpdatePost, { new: true });
      res.status(202).json({
        message: `Post with id:${id} is Updated`,
        id: id,
      });
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  },
  likePosts: async (req, res, next) => {
    try {
      const { id } = req.params;
      req.userid = "uuid1";
      if (!req.userid) {
        return res.json({
          message: "Unauthenticated",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          message: `No Post with id:${id}`,
        });
      }
      const PostMsg = PostModel.findById(id);
      const Index = PostMsg.like.filter((id) => id === String(req.userid));
      if (Index === -1) {
        PostMsg.like.push(req.userid);
      } else {
        PostMsg.like.filter((id) => id !== String(req.userid));
      }
      const UpdatePost = await PostModel.findByIdAndUpdate(id, PostMsg, {
        new: true,
      });
      res.status(200).json({
        message: `You Liked Post with ${id}`,
        UpdatePost,
      });
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  },
  deletePosts: async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          message: `No Post with id:${id}`,
        });
      }
      await PostModel.findByIdAndDelete(id);
      res.status(202).json({
        message: `Post with id:${id} is Deleted`,
      });
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  },
};

module.exports = PostCTRL;
