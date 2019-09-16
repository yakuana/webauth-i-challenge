const express  = require('express'); 
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('./register/register-router.js');

const server = express(); 

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', registerRouter); 

server.get('/', (req, res) => {
    res.send("Let's Sign In!")
})

module.exports = server; 