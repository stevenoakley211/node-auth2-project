const router = require('express').Router();
const Users = require('../users/users-model.js')
const bcrypt =require('bcrypt')
const jwt = require( 'jsonwebtoken')
const secrets = require('../Config/secrets')

const genToken = (user) =>{
    const payload = {
        userid: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1hr'
    }
    const token = jwt.sign(payload,secrets.jwtSecret,options)
    return token
}

router.post('/register', (req, res) =>{
    let user = req.body;
    const hash = bcrypt.hashSync(user.password,10)
    Users.add({
        username: user.username,
        password: hash,
        department: user.department

    })
    .then(newUser =>{
        console.log(newUser)
        const token = genToken(newUser)
        res.status(201).json({created_user: newUser,token:token})
    })
    .catch(err => res.status(500).json({message:"something went wrong",error:err}))
})

router.post("/login", (req, res) =>{
    const {username, password} = req.body;
    Users.findBy({ username }).first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = genToken(user)
            res.status(200).json({token, message: 'welcome to our api,'  })
        } else {
            res.status(401).json({ message: 'wrong credentials' })
        }
    })   
})

module.exports = router