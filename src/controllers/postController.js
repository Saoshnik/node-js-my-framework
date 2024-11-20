'use strict';

const Post = require('../models/postModel');
const {Types} = require("mongoose");

class PostController {
    async create(req, res) {
        const {title, body, likes} = req.body;

        const post = new Post({title, body, likes});
        await post.save();

        res.send(post);
    }

    async getAll(req, res) {
        if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
            const post = await Post.findById(req.params.id);
            res.send(post);
            return;
        }

        const posts = await Post.find();
        res.send(posts);
    }

    async update() {

    }

    async delete() {

    }
}

module.exports = new PostController();
