var form = document.getElementById("reg-form");



form.addEventListener("submit", function(event){
  event.preventDefault()
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var user_data = {
    username:`${username}`,
    password: `${password}`
  }

  fetch("/signUp", {
    method: 'POST',
    body: JSON.stringify(user_data),
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.redirected){
      window.location.href = res.url
    }
  })
})






















// const onLoadFunc = () => {
//   fetch('/onload')
//   .then((response) => {
//     return response.json();
//   })
//   .then((response) => {
//     // display it on the page
//     //dom manipulation
//     //access each element
//
//     response.forEach(function(element){
//       //1- create a div, give it an id and insert it in the doc
//       var div=document.createElement("div");
//       div.setAttribute("class","todo-container");
//       var sections = document.getElementsByTagName('section');
//       var section = sections[0];
//       section.appendChild(div);
//       //create a p
//       var p = document.createElement("p");
//       // give it an id
//       p.setAttribute("class", "todo-description");
//       // and then insert it in the div, then in the doc
//       div.appendChild(p);
//       //then append text to it
//       p.textContent = element.description;
//
//     });
//   })
//   .catch ((error)=>{
//     console.log("Error!", error)
//   })
// }
//
// onLoadFunc();
