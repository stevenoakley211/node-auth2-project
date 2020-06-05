const express = require('express');
const session = require('express-session');
const server = express();

const KnexSessionStore = require('connect-session-knex')(session)
const userRouter = require('..Users/users-router')
const authRouter = require('../auth/auth-router')

const auth = require('../Auth/auth-session')

const sessionConfig = {
    name: 'expsession',
    secret: 'nosecret',
    cookie: {
        maxAge: 1000*60*60,
        secure: false,
        httpOnly:true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        tablename: "sessions",
        sidfieldname:"sid",
        createTable: true,
        clearInterval: 1000*60*60
    })

}

server.use(express.json())
server.use(session(sessionConfig))
server.use(auth)
server.use('/api/users',userRouter)
server.use('/api/auth',authRouter)

module.exports = server
