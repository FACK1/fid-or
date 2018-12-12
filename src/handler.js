const fs = require('fs');
const path = require('path');
const dbConnection = require('./database/db_connection.js');
const bcrypt = require('bcryptjs');
const qs = require('querystring');


const homeRouterHandler = (request, response) => {
  const htmlPath = path.join(__dirname, "../Public/index.html");
  const html = fs.readFile ( htmlPath, (error, html) => {
  if (error) {
    response.writeHead (500, {"content-type": "text/plain"});
    response.end("Server Error!");
    return;
  }
    response.writeHead(200, {"content-type": "text/html"});
    response.end(html);
  });
}


const publicHandler = (request, response) => {
  const filePath = path.join(__dirname,"..", request.url)
  const extension = request.url.split(".")[1]
  const contentTypeMapping = {
    js: "application/js",
    css: "text/css",
    html: "text/html"
  };

  fs.readFile ( filePath, (error, file) => {
    if (error) {
      response.writeHead (500, {"content-type": "text/html"});
      response.end("<h1> Server Error! </h1>");
      return;
    }
    response.writeHead(200, {"content-type": contentTypeMapping[extension]});
    response.end(file);
  });


}


const signUpHandler = (request, response) => {

  let body = '';
  request.on('data', (data) => {
    body += data;
  });

  request.on('end', () => {

    const { username, password } = JSON.parse(body)
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(hashErr, hashed) {

        if (hashErr) {
        response.statusCode = 500;
        response.end('Error registering')
        return
      }
      const userArray = [username, hashed];
      const addUserString = `INSERT INTO users (username, password) VALUES ($1, $2)`;

      dbConnection.query(addUserString,userArray,(err, dbRes) => {
          if (err) {
            console.log("Error")
            console.log(err);
          } else {

              response.writeHead(301, {"Location":"/Public/login.html"})
              response.end();
              return
          }
    })
  })
})
})
}












//
// const onLoad = (request, response) =>{
//   //get data from the database
//   dbConnection.query('SELECT * FROM tododb', (err, result) => {
//     if (err) {
//       console.log("Error")
//       console.log(err);
//     } else {
//         console.log(result);
//         response.writeHead(200, {"content-type":"application/json"})
//         response.end(JSON.stringify(result.rows));
//     }
//   });
// };

const errorhandler = (request, response) => {
  response.writeHead(404, {"content-type":"text/plain"})
  response.end("Sorry! Server Error!")
}

 const handlers = {
  homeRouterHandler,
  signUpHandler,
  publicHandler,
  // onLoad,
  errorhandler,
  // addHandler,
  // deleteHandler,
  // updateHandler
}

module.exports = handlers;
