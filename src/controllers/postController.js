'use strict';

const models = require('../models/models');

class PostController {
    async create(req, res) {
        const {title, body, likes} = req.body;

        const post = new models.Post({title, body, likes});
        await post.save();

        res.send(post);
    }

    async getAll(req, res) {
        if (req.params.id) {
            const post = await models.Post.findById(req.params.id);
            res.send(post);
            return;
        }

        const posts = await models.Post.find();
        res.send(posts);
    }

    async getOne(req, res) {

    }


    async update() {

    }

    async delete() {

    }
}

module.exports = new PostController();
