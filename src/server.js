const http =require("http");
const router = require('./router');
const PORT = process.env.PORT || 7000;

const server = http.createServer(router);

server.listen(PORT);

console.log(`Server is running on ${PORT}`)
