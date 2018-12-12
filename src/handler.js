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
        res.statusCode = 500;
        res.end('Error logging in')
        return
      }
      else if (!passwordsMatch) {

        response.writeHead(302, {'content-type': 'text/plain'})
        response.end('There was a problem with your login details')
      }
      else{
        
          response.writeHead(302, {"location": "/Public/todo-list.html"});
          response.end();
          };
        })
      }
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
  loginHandler,
  publicHandler,
  // onLoad,
  errorhandler,
  // addHandler,
  // deleteHandler,
  // updateHandler
}

module.exports = handlers;
