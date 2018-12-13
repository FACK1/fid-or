const fs = require('fs');
const path = require('path');
const dbConnection = require('./database/db_connection.js');
const bcrypt = require('bcryptjs');
<<<<<<< Updated upstream
const qs = require('querystring');
=======
const jwt = require('jsonwebtoken');
const cookie = require("cookie");
require("env2")("config.env")
>>>>>>> Stashed changes


const homeRouterHandler = (request, response) => {
  const htmlPath = path.join(__dirname, "../Public/index.html");
  const html = fs.readFile ( htmlPath, (error, html) => {
  if (error) {
    response.writeHead (500, {"content-type": "text/plain"});
    response.end("Server Error here!");
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
      response.end("<h1> Server Error! HEEEREEEE!</h1>");
      return;
    }
    response.writeHead(200, {"content-type": contentTypeMapping[extension]});
    response.end(file);
  });
}

const todoHandler = (request, response) => {
  const htmlPath = path.join(__dirname, "../Public/todo-list.html");
  const html = fs.readFile ( htmlPath, (error, html) => {
  if (error) {
    console.log()
    response.writeHead (500, {"content-type": "text/plain"});
    response.end("Server Error here!");
    return;
  }else{
    //check if there's  a cookie
      if (!request.headers.cookie){
        console.log("bro Hey ")
        response.writeHead(200, {"content-type": "text/html"});
        response.end("<h1>Invalid login information</h1>");
      }else{
        //check if it's user_id cookie
          const cookiesObject = cookie.parse(request.headers.cookie)
          const { user_id } = cookiesObject
          console.log('todo handler: ', request.headers.cookie);

        if(!user_id){
          response.writeHead(200, {"content-type": "text/html"});
          response.end("<h1>Invalid login information</h1>");
        }else{
          //verify that it's a valid cookie
          return jwt.verify(user_id, process.env.SECRET, (err, user__id) => {
          if (err) {
            return send401();
          } else {
            response.writeHead(200, {"content-type": "text/html"});
            response.end(html);
            }
          });
        }
      }
    }
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
      var userArray = [username, hashed];

      dbConnection.query(`INSERT INTO users (username, password) VALUES ($1, $2)`,userArray,
       (err, result) => {
          if (err) {
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

/*-----login handler ---*/


const loginHandler = (request, response) => {
  let loginBody = '';
  request.on('data', (data) => {
    loginBody += data;
  })

  request.on('end', () => {
  const { username, password } = JSON.parse(loginBody)

  const passQuery = `select password from users where username = $1`;

  dbConnection.query(passQuery, [username],
   (err, existingPass) => {
     if (err){
       console.log(err)
     } else {
       bcrypt.compare(password, existingPass.rows[0].password, (err, passwordsMatch) => {
      if (err) {
        response.statusCode = 500;
        response.end('Error logging in')
        return
      }
      else if (!passwordsMatch) {
        console.log('bad pass')
        // response.writeHead(200, {'content-type': 'text/plain'})
        response.statusCode = 403
        response.end('There was a problem with your login details')
        console.log(response)
        return
      }
      else{
<<<<<<< Updated upstream
        
          response.writeHead(302, {"location": "/Public/todo-list.html"});
=======
        const secret = process.env.SECRET
        user_id = userDetails.rows[0].id
        const user_cookie = jwt.sign(user_id, secret);
        console.log(user_cookie)

          response.writeHead(302, {
            "set-cookie":`user_id=${user_cookie}`,
            "location": "/todo-list"});
>>>>>>> Stashed changes
          response.end();
          };
        })
      }
    })
   })
  }

const errorhandler = (request, response) => {
  response.writeHead(404, {"content-type":"text/plain"})
  response.end("Sorry! Server Error!")
}

 const handlers = {
  homeRouterHandler,
  signUpHandler,
  loginHandler,
  publicHandler,
  todoHandler,
  errorhandler,
  // addHandler,
  // deleteHandler,
  // updateHandler
}

module.exports = handlers;
