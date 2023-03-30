"use strict";

let mainWraperDiv = document.getElementById("wraper-posts");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");

//მთავარი ფუნქცია
function postsAjax(url, callback) {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", url);

  requestPost.addEventListener("load", function () {
    let data = JSON.parse(requestPost.responseText);
    callback(data);
  });
  requestPost.send();
}

//მთავარი ფუნქციის გამოძახება
postsAjax("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((element) => {
    createPostDiv(element);
  });
});

//შევქმნათ პოსტის დივი
function createPostDiv(item) {
  let divWraper = document.createElement("div");
  divWraper.classList.add("post");
  divWraper.setAttribute("data-id", `${item.id}`);

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  divWraper.appendChild(h4Element);
  divWraper.appendChild(h2Element);

  divWraper.addEventListener("click", function (e) {
    //როდესაც დივს დავაკლიკებ რა მინდა რომ მოხდეს
    console.log(e.target);
    let divId = e.target.getAttribute("data-id"); //ატრიბუტის მნიშვნელობის ამოღება
    console.log(divId);

    overlay.classList.add("overlayActive");
    let newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;
    postsAjax(newUrl, function (newData) {
      // console.log(newData);
      overlayDescription(newData);
    });
    console.log(newUrl);
  });

  mainWraperDiv.appendChild(divWraper);
  console.log(mainWraperDiv);
}

//postis დეტალური ინფოს დამატება

function overlayDescription(x) {
  let descr = document.createElement("p");
  descr.innerText = `${x.body}`;
  content.appendChild(descr);
}

// დახურვა
closeIcon.addEventListener("click", function () {
  overlay.classList.remove("overlayActive"); //წავუშლოთ
  content.innerHTML = " "; // გაავსუთაოთ 
});
