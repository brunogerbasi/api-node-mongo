const User = require('../models/User')
// const Session = mongoose.model('Session');
const bcrypt = require('bcrypt');

module.exports = {

    async store(req, res){
        const { email, password } = req.body

        try {            
            const userExists = await User.findOne({ email })           
            if(!userExists) return res.status(400).send({message: 'Usuario nao existe'}) 

            // return res.status(200).send(userExists)
            const validPassword = await bcrypt.compare(password, userExists.password)
            if (!validPassword) return res.status(400).send({ message:'Sennha invalida' })

            return res.status(200).send(userExists)
        } catch(err) {
            return res.status(400).send(err)
        }

        return res.json(User);
    }
    

}