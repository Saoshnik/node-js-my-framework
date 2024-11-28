'use strict';

const Post = require('../models/postModel');
const {Types} = require('mongoose');

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
            const {id} = req.params;

            if (id && Types.ObjectId.isValid(id)) {
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

    async update(req, res) {
        try {
            const {id} = req.params;
            const {title, body, likes, user} = req.body;

            const post = await Post.findOneAndUpdate(
                {_id: id},
                {title, body, likes, userId: user._id},
                {new: true} // чтобы получить обновленную модель
            );
            if (!post) {
                throw new Error(`Пост с id=${id} не существует`);
            }

            res.send(post);
        } catch (err) {
            res.send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            const post = await Post.findById(id);
            if (!post) {
                throw new Error(`Пост с id=${id} не существует`);
            }

            await post.deleteOne();
            res.send(`Пост с id=${id} успешно удален`)
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new PostController();
