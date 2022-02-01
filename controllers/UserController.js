const User = require("../models/User");
const bcrypt = require ('bcryptjs');



const UserController ={
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

    login(req,res){
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            res.send(user)
        })
    }

}
module.exports = UserController;