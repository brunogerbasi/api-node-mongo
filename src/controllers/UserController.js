const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    } catch(err){
        return err
    }
}

module.exports = {    

    async index( req, res){
        const { page } = req.query;
        const users = await User.paginate({},{page, limit:15});

        return res.json(users);
    },

    async show(req, res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async store(req, res){
        const { name, email, password, clube } = req.body

        try{
            const userAlredyExists = await User.findOne({ email })
            if(userAlredyExists) return res.status(400).send({message: 'Usuario já existe'})    

            const hashedPassword = await hashPassword(password)
            
            const createdUser = await User.create({
                name,
                email,
                password: hashedPassword,
                clube
            })

            return res.status(201).send(createdUser)
        }catch(err){
            return res.status(400).send(err)
        }

        return res.json(User);
    },

    // async store(req, res){
    //     const user = await User.create(req.body);
    //     return res.json(User);
    // },

    async update(req, res){
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true 
        });

        return res.json(user);
    },

    async destroy(req, res){
        await User.findByIdAndRemove(req.params.id);

        return res.send();
    }
    
};