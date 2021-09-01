function getUserInput() {
  return document.getElementById("search_text").value;
}

function pushToDOM(response) {
  response = JSON.parse(response);
  let container = document.getElementById("gif");
  let images = response.data;
  container.innerHTML = "";
  var received_gifs = [];

  images.forEach(function (image) {
    let src = image.images.fixed_height.url;
    let gif_temp = "<img src='" + src + "' class='container-image' />";
    container.innerHTML += gif_temp;
    received_gifs.push(gif_temp)
  });
}

function searchGif(key_words) {
  let api_url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + key_words;

  let api_AJAX_call = new XMLHttpRequest();
  api_AJAX_call.open("GET", api_url);
  api_AJAX_call.send();

  api_AJAX_call.addEventListener("load", function (data) {
    let actual_data = data.target.response;
    pushToDOM(actual_data);
    console.log(actual_data);
  });
}

function highlightButton() {
  document.getElementById("search_button").style.backgroundColor = "rgb(5, 54, 104)";
  document.getElementById("search_button").style.color = "white";
}

function restoreButton() {
  document.getElementById("search_button").style.backgroundColor = "lightslategrey";
  document.getElementById("search_button").style.color = "black";
}

if (window.matchMedia("(any-pointer: fine)").matches) {
  document.getElementById("search_button").addEventListener("mouseover", function () {
    highlightButton();
  });
  document.getElementById("search_button").addEventListener("mouseout", function() {
    restoreButton();
  });
}
else {
  document.getElementById("search_button").addEventListener("mousedown", function () {
    highlightButton();
  });

  document.getElementById("search_button").addEventListener("mouseup", function () {
    restoreButton();
  });
}

document.getElementById("search_button").addEventListener("click", function() {
  searchGif(getUserInput());
});

document.getElementById("search_text").addEventListener("keydown", function (key) {
  if (key.which === 13) { 
    highlightButton();
  }
});

document.getElementById("search_text").addEventListener("keyup", function (key) {
  if (key.which === 13) { 
    restoreButton();
  }
});

document.getElementById("search_text").addEventListener("keypress", function (key) {
  if (key.which === 13) { 
    searchGif(getUserInput());
  }
});