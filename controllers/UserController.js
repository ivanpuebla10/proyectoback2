const User = require("../models/User");
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');
const transporter = require("../config/nodemailer");;


const UserController ={
    async getAll(req, res) {
        try {
           const users = await User.find()
           res.send(users)
        } catch (error) {
            console.error(error);
        }
    },

    async getInfo(req, res) {
      try {
        const user = await User.findById(req.user._id).populate("postIds");
        res.send(user);
      } catch (error) {
        console.error(error);
      }
    },
  

    async create(req,res){
        try {
            if( !req.body.password){
                return res.status(400).json({msg:'Por favor rellene todos los campos'})
            }
            const email = req.body.email;
            const user = await User.findOne({ email: email })
            if (user) {
                return res.status(400).send({ message: 'Este correo ya existe' });
            }
            req.body.role = req.body.role ? req.body.role : "user";
            const hash = bcrypt.hashSync(req.body.password,10);
            const newUser = await User.create({...req.body, password:hash, confirmed: false  })
            const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
            const url = 'http://localhost:3000/users/confirm/'+ emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                <a href="${url}"> Click para confirmar tu registro</a>`,
              });        
            res.status(201).send({ message: 'waiting for confirmation, please check your email', newUser})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem creating the user' })
        }
    },

    async login(req,res){
        try {
            const user = await User.findOne({ email: req.body.email });
            if(!user){
                return res.status(400).send({message:"email or password wrong"})
            }
            if(!user.confirmed){
                return res.status(400).send({message:"Please check your email and confirm your account"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"email or password wrong"})
            }
            token = jwt.sign({ _id: user._id }, jwt_secret);;
            if (user.token.length > 4) user.tokens.shift();
            user.token.push(token);
            await user.save();
            res.send({ message: 'Welcome ' + user.username, user, token});
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem' })
        }
    },

    async logout(req, res) {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $pull: { token: req.headers.authorization },
          });
          res.send({ message: "User logged out" });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            message: "There was a problem with the logout",
          });
        }
      },

      async confirm(req,res){
        try {
        const token = req.params.emailToken
        const payload = jwt.verify(token,jwt_secret)      
        await User.findOneAndUpdate( {email: payload.email}, {$set:{confirmed: true}}, {new: true} )
        res.status(201).send( "User confirmed" );
        } catch (error) {
          console.error(error)
        }
      },
      

    
}
module.exports = UserController;