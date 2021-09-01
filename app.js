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

document.getElementById("search_button").onclick = function deploy() {
  searchGif(getUserInput());
}
document.getElementById("search_text").addEventListener('keypress', function (key) {
  if (key.which === 13) { 
    searchGif(getUserInput());
  }
});