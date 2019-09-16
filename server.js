const express  = require('express'); 

const registerRouter = require('./register/register-router.js');

const server = express(); 

server.use(express.json()); 
server.use('/api/register', registerRouter); 

server.get('/', (req, res) => {
    res.send("Let's Sign In!")
})

module.exports = server; 