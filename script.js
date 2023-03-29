"use strict";

let mainWraperDiv = document.getElementById("wraper-posts");

//მთავარი ფუნქცია
function postsAjax() {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", "https://jsonplaceholder.typicode.com/posts");

  requestPost.addEventListener("load", function () {
    let data = JSON.parse(requestPost.responseText);

    data.forEach((element) => {
    createPostDiv(element)
    });

  });
  requestPost.send();
}

//შევქმნათ პოსტის დივი
function createPostDiv(item) {
  let divWraper = document.createElement("div");
  divWraper.classList.add("post");

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  divWraper.appendChild(h4Element);
  divWraper.appendChild(h2Element);

  mainWraperDiv.appendChild(divWraper);
  console.log(mainWraperDiv);
}

postsAjax();
