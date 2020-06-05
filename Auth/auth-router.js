const router = require('express').Router();
const Users = require('../users/users-model.js')
const bcrypt =require('bcrypt')
const isValid = require('../Middleware/users-service')
router.post('/register', (req, res) =>{
    let user = req.body;
    const hash = bcrypt.hashSync(user.password,10)

    if(isValid(req.body))
    Users.add({
        username: user.username,
        password: hash
    })
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({message:"something went wrong",error:err}))
})

router.post("/login", (req, res) =>{
    const {username, password} = req.body;
    Users.findBy({ username }).first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            req.session.user = user
            res.status(200).json({message: 'welcome to the jungle, ' + username })
        } else {
            res.status(401).json({ message: 'wrong credentials' })
        }
    })   
})

module.exports = router