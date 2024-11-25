'use strict';

const Post = require('../models/postModel');
const {Types} = require("mongoose");

class PostController {
    async create(req, res) {
        try {
            const {title, body, likes, user} = req.body;

            const post = new Post({title, body, likes, userId: user._id});
            await post.save();

            res.send(post);
        } catch (err) {
            res.send(err.message);
        }
    }

    async getAll(req, res) {
        try {
            if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
                const post = await Post.findById(req.params.id);
                res.send(post);
                return;
            }

            const posts = await Post.find();
            res.send(posts);
        } catch (err) {
            res.send(err.message);
        }
    }

    async update() {

    }

    async delete() {

    }
}

module.exports = new PostController();
