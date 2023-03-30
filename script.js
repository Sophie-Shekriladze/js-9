"use strict";

let mainWraperDiv = document.getElementById("wraper-posts");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");

//მთავარი ფუნქცია
function postsAjax() {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", "https://jsonplaceholder.typicode.com/posts");

  requestPost.addEventListener("load", function () {
    let data = JSON.parse(requestPost.responseText);

    data.forEach((element) => {
      createPostDiv(element);
    });
  });
  requestPost.send();
}

//შევქმნათ პოსტის დივი
function createPostDiv(item) {
  let divWraper = document.createElement("div");
  divWraper.classList.add("post");
  divWraper.setAttribute('data-id', `${item.id}`)

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  divWraper.appendChild(h4Element);
  divWraper.appendChild(h2Element);

  divWraper.addEventListener('click', function(e){    //როდესაც დივს დავაკლიკებ რა მინდა რომ მოხდეს
   console.log(e.target);
   let divId = e.target.getAttribute('data-id')  //ატრიბუტის მნიშვნელობის ამოღება
   console.log(divId);

   overlay.classList.add('overlayActive')
  })

  mainWraperDiv.appendChild(divWraper);
  console.log(mainWraperDiv);
}
// დახურვა
closeIcon.addEventListener('click', function(){
    overlay.classList.remove('overlayActive')  //წავუშლოთ
})

postsAjax();
