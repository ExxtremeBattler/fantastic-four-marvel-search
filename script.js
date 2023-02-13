// TRENDING IN THE UNIVERSE
function get_random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function trendingUniverse() {
  let startWith = generateRandomLetter();

  const marvelHeroURL =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    startWith +
    "&limit=99&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

  $.ajax({
    url: marvelHeroURL,
    method: "GET",
  }).then(function (response) {
    const allHeros = response.data.results;
    const randomHero = get_random(allHeros);
    console.log(randomHero);

    const randomHeroData = {
      name: randomHero.name,
      series: randomHero.series.items[0].name,
      img: randomHero.thumbnail.path,
    };

    $("#card-hero-img").attr("src", randomHeroData.img + ".jpg");
    $("#card-hero-title").text(randomHeroData.name);
    $("#card-hero-desc").text(`First appearance in ${randomHeroData.series}`);
  });

  startWith = generateRandomLetter();

  const marvelComicURL =
    "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=" +
    startWith +
    "&limit=99&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

  $.ajax({
    url: marvelComicURL,
    method: "GET",
  }).then(function (response) {
    const allComics = response.data.results;
    const randomComic = get_random(allComics);
    console.log(randomComic);

    const randomComicData = {
      title: randomComic.title,
      img: randomComic.images[0].path,
    };

    console.log(randomComicData.series);

    $("#card-comic-img").attr("src", randomComicData.img + ".jpg");
    $("#card-comic-title").text(randomComicData.title);
  });
}

trendingUniverse();

$(document).ready(function () {
  //makes sure html & css load before running the JS
  // SEARCH
  // advance search options onclick handler
  $("#advanceBtn").on("click", function (event) {
    event.preventDefault();
    $(".search-options").removeClass("hide");
  });

  let searchesList = $("#searches-list")
  let userSearches = []
  const storedSearches = JSON.parse(localStorage.getItem('marvelSearches'));


  function loadSearches (){
    
    // loops through storedSearches and creates buttons, as well as event listener for getting info when clicked
    for (let i = 0; i < storedSearches.length; i++) {

      var searchButton = $("<button>")
      searchButton[0].classList.add("btn", "btn-card")
      console.log(searchButton)
      

      searchButton[0].innerHTML = storedSearches[i]

      searchButton.on("click", function(event){
        event.preventDefault();

  let searchInput = event.target.innerHTML
  let marvelIdURL =
    "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
    searchInput +
    "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

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
})

      
  let listItemWrapper = $("<li>")
  listItemWrapper.append(searchButton)
  searchesList.append(listItemWrapper)
    }
  }

  loadSearches()


  function saveSearch(search) {

    // if search is already in list, move to top
    if (userSearches.includes(search)){
      userSearches.splice(userSearches.indexOf(search), 1)
    }

    userSearches.unshift(search);
    localStorage.setItem("marvelSearches", JSON.stringify(userSearches))
      
    // limits length of search list to 5
    if (userSearches.length > 5) {
        userSearches.length = 5
      } 
      
      // empties list
      searchesList.empty()

          // loops through userSearches and creates buttons, as well as event listener for getting info when clicked
      for (let i = 0; i < userSearches.length; i++) {

        
        var searchButton = $("<button>")
        searchButton[0].classList.add("btn", "btn-card")
        
        searchButton[0].innerHTML = userSearches[i]
        console.log(searchButton)
        console.log(userSearches)

        searchButton.on("click", function(event){
          event.preventDefault();

    let searchInput = event.target.innerHTML
    let marvelIdURL =
      "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
      searchInput +
      "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

      saveSearch(searchInput)

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
  })

        
    let listItemWrapper = $("<li>")
    listItemWrapper.append(searchButton)
    searchesList.append(listItemWrapper)
      }
  }


 


  // starting the onClick function for 'Search'
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    let searchInput = $("#searchInput").val();
    let marvelIdURL =
      "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
      searchInput +
      "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

      saveSearch(searchInput)

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

      // grabs advanced search parameters
    let year = $("#startYearInput").val()
    let series = $("#seriesInput").val()
    let creator = $("#creatorInput").val()

    console.log(year);
    console.log(series);
    console.log(creator);

    if (year === "" && series === "" && creator === ""){

      let marvelComicURL =
        "https://gateway.marvel.com:443/v1/public/characters/" +
        characterId +
        "/comics?orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

    }
    else if (!creator){
      
      let marvelComicURL =
      "https://gateway.marvel.com:443/v1/public/characters/" +
      characterId +
      "/comics?startYear="+ year + 
      "&titleStartsWith=" + series +
      "&orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";
     
    }
    
    

      //new URL to search for comics of the chosen character

      // let marvelComicURL =
      // "https://gateway.marvel.com:443/v1/public/characters/" +
      // characterId +
      // "/comics?startYear="+ year + 
      // "&titleStartsWith=" + series +
      //  "&creator = " + creator +
      // "&orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";
     
  
      // second ajax to return the last 20 or so comics for the character, will update to 5 tomorrow, check log for results
      $.ajax({
        url: marvelComicURL,
        method: "GET",
      }).then(function (response) {
        console.log(response.data.results);
      })
    })
  })
});

let hero = {
  name:"",
  appearance:"",
  firstname:"",
  alignment:"",
  group:"",
  img:"",
}
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
// let marvelcharacter = $("#searchInput").val;
let marvelcharacter = $("#searchInput").val();
let superqueryURL =
  "https://marvel-cors.mrof.workers.dev/corsproxy/?apiurl=https://www.superheroapi.com/api/9055872414486600/";
//gets a character id
$.ajax({
  url: superqueryURL + "search/" + marvelcharacter,
  method: "GET",
}).then(function (response) {
  console.log(response)
  console.log(response.results[0].image.url)

  hero.name = response.results[0].name;
  hero.appearance = response.results[0].biography["first-appearance"];
  hero.firstname = response.results[0].biography["full-name"];
  hero.alignment = response.results[0].biography.alignment;
  hero.group = response.results[0].connections["group-affiliation"];
  hero.img = response.results[0].image.url;    
  })

  $("#hero-name").text(hero.name)
  $("#bio-nickname").text(hero.name)
  $("#bio-appearance").text(hero.appearance)
  $("#bio-firstname").text(hero.firstname)
  $("#bio-alignment").text(hero.alignment)
  $("#bio-group").text(hero.group)
  $("#bio-img").attr("src", hero.img)
  
})
