const User = require("../models/User");
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')


const UserController ={
    async getAll(req, res) {
        try {
           const users = await User.find()
           res.send(users)
        } catch (error) {
            console.error(error);
        }
    },

    async create(req,res){
        try {
            req.body.role = req.body.role ? req.body.role : "user";
            const hash = bcrypt.hashSync(req.body.password,10);
            const user = await User.create({...req.body, password:hash, confirmed: false  })
            res.status(201).send({ message: 'user created', user})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem creating the user' })
        }
    },

    async login(req,res){
        try {
            const user = await User.findOne({ email: req.body.email });
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            token = jwt.sign({ _id: user._id }, jwt_secret);
            req.body.token = token;
            res.send({ message: 'Bienvenido ' + user.username, user, token});
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem' })
        }
    }
}
module.exports = UserController;