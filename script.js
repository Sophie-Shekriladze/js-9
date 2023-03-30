"use strict";

let mainWraperDiv = document.getElementById("wraper-posts");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");
let addButton = document.getElementById("add");
let addoverlayContent = document.getElementById("overlay-content");
let form = document.getElementById("add-form-post");
let input = document.getElementById("title");

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
postsAjax("https://jsonplaceholder.typicode.com/posts", function (x) {
  x.forEach((element) => {
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

  //წაშლის ღილაკი
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.setAttribute("data-id", `${item.id}`);

  divWraper.appendChild(h4Element);
  divWraper.appendChild(h2Element);
  divWraper.appendChild(deleteButton);

  // წაშლის ფუნქციონალი

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let buttonId = event.target.getAttribute("data-id");
    console.log("buttonId", buttonId);

    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${buttonId}`;
    console.log(("deleteUrl = ", deleteUrl));

    fetch(deleteUrl, {
      method: "DELETE",
    }).then(() => divWraper.remove());
  });

  divWraper.addEventListener("click", function (e) {
    //როდესაც დივს დავაკლიკებ რა მინდა რომ მოხდეს
    // console.log(e.target);
    let divId = e.currentTarget.getAttribute("data-id"); //ატრიბუტის მნიშვნელობის ამოღება
    // console.log(divId);

    overlay.classList.add("overlayActive");
    let newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;
    postsAjax(newUrl, function (newData) {
      console.log(newData);
      overlayDescription(newData); //კონკრეტული მნიშვნელობა, დავაკლიკებთ და გამოიტანს იმ ტექსტს
    });
    // console.log(newUrl);
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

//postis damateba

addButton.addEventListener("click", function () {
  addoverlayContent.classList.add("activeAddOverlay");
  input.value = " ";
});

form.addEventListener("submit", function (event) {
  event.preventDefault(); //რომ არ დარეფრეშდეს

  let formData = {
    title: event.target[0].value,
  };
  console.log(formData);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((damatebuliPosti) => {
      createPostDiv(damatebuliPosti);
      addoverlayContent.classList.remove("activeAddOverlay");
      console.log(damatebuliPosti);
    });
});
