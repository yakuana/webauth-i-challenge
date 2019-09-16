const server = require('./server.js'); 

const PORT = processs.env.PORT || 5000; 

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`); 
}); 