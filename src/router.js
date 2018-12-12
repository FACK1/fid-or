const fs = require("fs");
const path = require("path");
const handlers = require("./handler");


const router = (request, response) => {
  console.log(request.method, request.url);
  const url = request.url;
  if ( url === '/') {
    handlers.homeRouterHandler(request, response)
  } else if ( url.includes('/Public/')){
    console.log('public')
    handlers.publicHandler(request, response)
  }else if ( url === ('/signUp')){
      handlers.signUpHandler(request, response)
  // } else if (url === "/onload"){
  //   handlers.onLoad(request, response)
  }else{
    handlers.errorhandler(request, response);
  }
}



//
//   else if (url === "/add/") {
//     handlers.addHandler(request, response)
//   }  else if (url === "/delete/") {
//     handlers.deleteHandler(request, response)
//   }  else if (url === "/update/") {
//     handlers.updateHandler(request, response)
//   }
// }
 module.exports = router;
