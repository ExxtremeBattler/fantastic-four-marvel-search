$( document ).ready(function(){ //makes sure html & css load before running the JS

  let marvelPublicApiKey = "6f68ec270b01384876787724cd124e64"
  let marvelPrivateApiKey = "189d5043bc54220212294812e2de32eeda0e263a"
  let marvelAuthKey = marvelPublicApiKey + marvelPrivateApiKey
  let marvelHash = "701330a00b13eb2a18e31cad8b72fe5b"
  

  


// SEARCH
// advance search options onclick handler
$("#advanceBtn").on("click", function (event) {
  event.preventDefault();
  $(".search-options").removeClass("hide");
});

// starting the onClick function for 'Search'
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  let searchInput = $("#searchInput").val()
  let marvelIdURL = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + searchInput + "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b"

  $.ajax({
    url: marvelIdURL,
    method: "GET"
  }).then(function(response){
  

    var characterId = response.data.results[0].id
    console.log (characterId)
    
    console.log(response.data.results[0].comics)
      

    let marvelComicURL = "https://gateway.marvel.com:443/v1/public/characters/" + characterId + "/comics?orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b"

   

    $.ajax({
      url: marvelComicURL,
      method: "GET"
    }).then(function(response){

      console.log(response.data.results);


    });
    

   })
    });
  });




