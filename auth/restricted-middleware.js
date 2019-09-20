//  第二天

module.exports = (req, res, next) => {
    // do we have information about the user in our session?
    if (req.session && req.session.user) {
        // successful
        next();
    } else {
        //unsuccessful 
        res.status(401).json({ 
            message: 'You shall not pass!' 
        });
    }
};
  

// 第一天
// const bcrypt = require('bcryptjs'); 

// const db = require('../register/register-model.js'); 

// const validate = (req, res, next) => {
//     // get password and username from headers (not body)
//     let { username, password } = req.headers; 

//     // use data base (register-model) to check if username exists
//     db.findBy({ username })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 // password success 
//                 next(); 
//             } else {
//                 console.log("pass and user.pass", password, user.password)
//                 // password failure 
//                 res.status(401).json({ 
//                     message: 'You cannot pass!' 
//                 })
//             }
//         })
//         .catch(error => {
//             // username not in database 

//             res.status(500).json({
//                 message: 'Invalid Credentials', 
//                 error: error 
//             }); 
//         })
// }

// module.exports = validate; 