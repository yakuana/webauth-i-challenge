const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./register-model.js');
const restricted = require('../auth/restricted-middleware.js')

const router = express.Router();

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    
    const hash = bcrypt.hashSync(password, 8); 
  
    db.add({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    db.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You cannot pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
  
router.get('/users', restricted, (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error));
});

router.get('/hash', (req, res) => {
    const name = req.query.name;
  
    // hash the name
    const hash = bcrypt.hashSync(name, 8); 
    res.send(`the hash for ${name} is ${hash}`);
});

module.exports = router;