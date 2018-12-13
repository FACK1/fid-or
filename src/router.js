
const handlers = require("./handler");


const router = (request, response) => {
  console.log(request.method, request.url);
  const url = request.url;
  if ( url === '/') {
    handlers.homeRouterHandler(request, response)
  } else if ( url.includes('/Public/')){
    handlers.publicHandler(request, response)
  }else if ( url === '/signUp'){
      handlers.signUpHandler(request, response)
    }else if ( url === '/login'){
        handlers.loginHandler(request, response)
    }else if ( url === '/todo-list'){
          handlers.todoHandler(request, response)
    }else{
    handlers.errorhandler(request, response);
  }
}

 module.exports = router;
