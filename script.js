$(document).ready(function () {
  //makes sure html & css load before running the JS

  // SEARCH
  // advance search options onclick handler
  $("#advanceBtn").on("click", function (event) {
    event.preventDefault();
    $(".search-options").removeClass("hide");
  });


  // function to load last 5 searches in local storage
  let searchesList = $("#searches-list")
  let searchButton1 = $("#button1")
  let searchButton2 = $("#button2")
  let searchButton3 = $("#button3")
  let searchButton4 = $("#button4")
  let searchButton5 = $("#button5")

  function loadHistory() {

    searchButton1[0].innerHTML = localStorage.getItem("marvelSearch1")
    searchButton2[0].innerHTML = localStorage.getItem("marvelSearch2")
    searchButton3[0].innerHTML = localStorage.getItem("marvelSearch3")
    searchButton4[0].innerHTML = localStorage.getItem("marvelSearch4")
    searchButton5[0].innerHTML = localStorage.getItem("marvelSearch5")

  }
    
loadHistory()

// function to save search to local storage
var count = 0; 
function saveHistory(item) {
  
  if (count > 4){
    count = 0
  }
  console.log(count)
  count++
  localStorage.setItem("marvelSearch" +count, item)

};

  // starting the onClick function for 'Search'
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    let searchInput = $("#searchInput").val();
    let marvelIdURL =
      "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
      searchInput +
      "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

    // saves search in localStorage, and refresh the history
    saveHistory(searchInput);
    loadHistory()

    // first ajax to turn the hero name in searchInput into an Id the API can use
    $.ajax({
      url: marvelIdURL,
      method: "GET",
    }).then(function (response) {
      // store the first relevant character's id, log to be sure
      var characterId = response.data.results[0].id;
      console.log(characterId);

      // logs all the relevant characters
      console.log(response.data.results);

      // new URL to search for comics of the chosen character
      let marvelComicURL =
        "https://gateway.marvel.com:443/v1/public/characters/" +
        characterId +
        "/comics?orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

      // second ajax to return the last 20 or so comics for the character, will update to 5 tomorrow, check log for results
      $.ajax({
        url: marvelComicURL,
        method: "GET",
      }).then(function (response) {
        console.log(response.data.results);
      });
    });
  });


//
// let marvelcharacter = $("#searchInput");
let marvelcharacter = "hulk";
let superqueryURL =
  "https://marvel-cors.mrof.workers.dev/corsproxy/?apiurl=https://www.superheroapi.com/api/9055872414486600/";
//gets a character id
$.ajax({
  url: superqueryURL + "search/" + marvelcharacter,
  method: "GET",
}).then(function (nameid) {
  let id = nameid;
  //uses id to get character info
  $.ajax({
    url: superqueryURL + id,
    method: "Get",
  }).then(function (response) {
    console.log(response);
    let div = $("<div>");
    let img = $("<img>");
    let h4 = $("<h4>");
    let p = $("<p>");

    //name= results.biography.full-name,
    //first appearance= results.biography.first-appearance,
    //nickname= results.name,
    //alignment= results.biograpghy.alignment,
    //group affiliation = results.connections.group-affiliation
    //img = results.image.url
  });
})});
