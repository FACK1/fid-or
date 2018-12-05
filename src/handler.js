const fs = require('fs');
const path = require('path');


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

const onLoad = (request, response) =>{
var array = [
    {
      id: 0,
      description:"Make Breakfast",
      completed:false
    },

    { id:1,
      description:"Studying for exams",
      completed:true
    },

    { id:2,
      description:"Listen to music",
      completed:false
    }
  ]

    response.writeHead(200, {"content-type":"application/json"})
    response.end(JSON.stringify(array));
};

const errorhandler = (request, response) => {
  response.writeHead(404, {"content-type":"text/plain"})
  response.end("Sorry! Server Error!")
}

 const handlers = {
  homeRouterHandler,
  publicHandler,
  onLoad,
  errorhandler
  // addHandler,
  // deleteHandler,
  // updateHandler
}

module.exports = handlers;
