const express = require('express')
const router = express.Router();
const Users = require('../app/model/user'); 
const auth = require('../middlewares/auth')


const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const createUserToken = (userid) =>{
    return jwt.sign({id: userid},process.env.TOKEN_PASS,{expiresIn:'30m'});
}

router.get('/', async (req,res) =>{  
    try {
        const users = await Users.find({});
        return res.send(users);
    }catch (err) {

        return res.status(500).send({error:'Houve um erro ao fazer a consulta de usuarios'});
        
    }

})

router.post('/',auth, async(req,res)=>{
    const {username, password} = req.body;

    if(!username || !password) return res.status(400).send({error:'Houve um erro na criação de usuario, dados insuficientes'})

    try {
        if (await Users.findOne({username})) return res.status(400).send({error:'Usuário já cadastrado'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user,token: createUserToken(user.id)});


    } catch (err) {
        if(err) return res.status(500).send({error:'Erro ao criar usuario'});
    }

})

router.post('/auth', async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password) return res.status(400).send({error:'Houve um erro na autenticação de usuario, dados insuficientes'})

    try {
        const user = await Users.findOne({username}).select('+password');
        if(!user) return false//return res.status(402).send({error:'Usuário não consta no banco de dados'});

        const passOk = await bcrypt.compare(password,user.password);
        if(!passOk) return false//return res.status(401).send({error:'Erro ao autenticar usuário!'}); //aqui

        user.password = undefined;

        let token = createUserToken(user.id)

        res.cookie('token', `${token}`)

        res.redirect('/map');


    } catch (err) {
        console.log("erro", err)
        return res.status(500).send({error:'erro ao buscar usuário'});
    }
})



module.exports = router;