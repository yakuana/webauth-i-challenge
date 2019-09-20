const express  = require('express'); 
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('./register/register-router.js');

const server = express();

// creating session 
const session = require('express-session'); 
const KnexSessionStore = require('connect-session-knex')(session);
const userConfig = require('./data/user-config.js')

const sessionConfig = {
    name: 'chocochip', // the best cookie 
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 60 * 60, // in milliseconds
        secure: false, // true means only send cookie over https
        httpOnly: true, // true means JS has no access to the cookie
    },
    resave: false,
    saveUninitialized: true, // GDPR compliance (laws against setting cookies automatically)
    store: new KnexSessionStore({
        knex: userConfig,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30, // clean out expired session data
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', registerRouter); 

server.get('/', (req, res) => {
    res.send("Let's Sign In!")
})

module.exports = server; 