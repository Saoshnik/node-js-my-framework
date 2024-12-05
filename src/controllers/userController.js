'use strict';

const User = require('../models/userModel');
const Role = require('../models/roleModel');
const {Types} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = 7;

const generateAccessToken = (id, roles) => {
    return jwt.sign(
        {id, roles},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async registration(req, res) {
        try {
            const {name, email, password, age} = req.body;

            const candidate = await User.findOne({email});
            if (candidate) {
                throw new Error('Пользователь с таким email уже существует');
            }

            const userRole = await Role.findOne({value: 'USER'});
            const hashPassword = bcrypt.hashSync(password, salt);
            const user = new User({name, age, email, password: hashPassword, roles: [userRole.value]});

            await user.save();
            res.send(user);
        } catch (err) {
            if (res.statusCode === 200) {
                res.statusCode = 400;
            }
            res.send(err.message);
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                throw new Error('Пользователь с таким email не найден');
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                res.statusCode = 403;
                throw new Error('Указан неверный пароль');
            }

            const token = generateAccessToken(user._id, user.roles);
            res.send(token);
        } catch (err) {
            if (res.statusCode === 200) {
                res.statusCode = 400;
            }
            res.send(err.message);
        }
    }

    async getAll(req, res) {
        try {
            if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
                const user = await User.findById(req.params.id);
                return res.send(user);
            }

            const users = await User.find();
            res.send(users);
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new UserController();
