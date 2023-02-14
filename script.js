// TRENDING IN THE UNIVERSE
function get_random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// superhero function that calls on the api
function superhero(marvelCharacter) {
  const superqueryURL =
    "https://marvel-cors.mrof.workers.dev/corsproxy/?apiurl=https://www.superheroapi.com/api/9055872414486600/";

  $.ajax({
    url: superqueryURL + "search/" + marvelCharacter,
    method: "GET",
  }).then(function (response) {
    const hero = {
      name: response.results[0].name,
      appearance: response.results[0].biography["first-appearance"],
      firstname: response.results[0].biography["full-name"],
      alignment: response.results[0].biography.alignment,
      group: response.results[0].connections["group-affiliation"],
      img: response.results[0].image.url,
    };

    $("#hero-name").text(hero.name);
    $("#bio-nickname").text(hero.name);
    $("#bio-appearance").text(hero.appearance);
    $("#bio-firstname").text(hero.firstname);
    $("#bio-alignment").text(hero.alignment);
    $("#bio-group").text(hero.group);
    $("#bio-img").attr("src", hero.img);
  });
}

function trendingHero() {
  const startWith = generateRandomLetter();
  const marvelHeroURL =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    startWith +
    "&limit=99&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

  $.ajax({
    url: marvelHeroURL,
    method: "GET",
  }).then(function (response) {
    const allHeros = response.data.results;

    while (allHeros.length > 0) {
      const randomHero = get_random(allHeros);

      const noImg =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

      if (
        randomHero.series.items.length > 0 &&
        randomHero.thumbnail.path != noImg
      ) {
        const randomHeroData = {
          name: randomHero.name,
          series: randomHero.series.items[0].name,
          img: randomHero.thumbnail.path,
        };

        $("#card-hero-img").attr("src", randomHeroData.img + ".jpg");
        $("#card-hero-title").text(randomHeroData.name);
        $("#card-hero-desc").text(
          `First appearance in ${randomHeroData.series}`
        );

        $("#card-hero-link").on("click", function (event) {
          event.preventDefault();
          superhero(randomHeroData.name);
          $("#trending").addClass("hide");
          $("#searchResult").removeClass("hide");
        });

        console.log(randomHeroData.name);
        return;
      } else {
        allHeros.splice(allHeros.indexOf(randomHero), 1);
      }
    }
    // No hero matching this letter can be used, try with different letter
    trendingHero();
  });
}

function trendingComic() {
  const startWith = generateRandomLetter();

  const marvelComicURL =
    "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=" +
    startWith +
    "&limit=99&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

  $.ajax({
    url: marvelComicURL,
    method: "GET",
  }).then(function (response) {
    const allComics = response.data.results;

    while (allComics.length > 0) {
      const randomComic = get_random(allComics);

      if (randomComic.characters.items.length > 0) {
        const randomComicData = {
          title: randomComic.title,
          char: randomComic.characters.items[0].name,
          img: randomComic.thumbnail.path,
          url: randomComic.urls[0].url,
        };

        $("#card-comic-img").attr("src", randomComicData.img + ".jpg");
        $("#card-comic-title").text(randomComicData.title);
        $("#card-comic-desc").text(
          `${randomComicData.char} appears in the plot`
        );
        $("#card-comic-link").attr("href", randomComicData.url);
        return;
      } else {
        allComics.splice(allComics.indexOf(randomComic), 1);
      }
    }
    // No comic matching this letter can be used, try with different letter
    trendingComic();
  });
}

function trendingCreator() {
  const startWith = generateRandomLetter();
  const marvelCreatorURL =
    "https://gateway.marvel.com:443/v1/public/creators?nameStartsWith=" +
    startWith +
    "&limit=99&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

  $.ajax({
    url: marvelCreatorURL,
    method: "GET",
  }).then(function (response) {
    const allCreators = response.data.results;

    while (allCreators.length > 0) {
      const randomCreator = get_random(allCreators);

      const noImg =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

      if (
        randomCreator.thumbnail.path != noImg &&
        randomCreator.series.items.length > 0
      ) {
        const randomCreatorData = {
          name: randomCreator.fullName,
          img: randomCreator.thumbnail.path,
          url: randomCreator.urls[0].url,
          series: randomCreator.series.items[0].name,
        };

        $("#card-creator-img").attr("src", randomCreatorData.img + ".jpg");
        $("#card-creator-title").text(randomCreatorData.name);
        $("#card-creator-desc").text(
          `Co-creator of ${randomCreatorData.series}`
        );
        $("#card-creator-link").attr("href", randomCreatorData.url);
        return;
      } else {
        allCreators.splice(allCreators.indexOf(randomCreator), 1);
      }
    }
    // No creator matching this letter can be used, try with different letter
    trendingCreator();
  });
}

function trendingUniverse() {
  trendingHero();
  trendingComic();
  trendingCreator();
}

trendingUniverse();

// $(document).ready(function () {
//   //makes sure html & css load before running the JS
//   // SEARCH
//   // advance search options onclick handler
//   $("#advanceBtn").on("click", function (event) {
//     event.preventDefault();
//     $(".search-options").removeClass("hide");
//   });

//   let searchesList = $("#searches-list");
//   let userSearches = [];
//   let storedSearches = JSON.parse(localStorage.getItem("marvelSearches"));
//   if (storedSearches == null) {
//     storedSearches = [];
//   }

//   function loadSearches() {
//     // loops through storedSearches and creates buttons, as well as event listener for getting info when clicked
//     for (let i = 0; i < storedSearches.length; i++) {
//       const searchButton = $("<button>");
//       searchButton[0].classList.add("btn", "btn-card");
//       console.log(searchButton);

//       searchButton[0].innerHTML = storedSearches[i];

//       searchButton.on("click", function (event) {
//         event.preventDefault();

//         let searchInput = event.target.innerHTML;
//         let marvelIdURL =
//           "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
//           searchInput +
//           "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//         // first ajax to turn the hero name in searchInput into an Id the API can use
//         $.ajax({
//           url: marvelIdURL,
//           method: "GET",
//         }).then(function (response) {
//           // store the first relevant character's id, log to be sure
//           var characterId = response.data.results[0].id;
//           console.log(characterId);

//           // logs all the relevant characters
//           console.log(response.data.results);

//           // new URL to search for comics of the chosen character

//           let marvelComicURL =
//             "https://gateway.marvel.com:443/v1/public/characters/" +
//             characterId +
//             "/comics?&orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//           // second ajax to return the last 20 or so comics for the character, will update to 5 tomorrow, check log for results
//           $.ajax({
//             url: marvelComicURL,
//             method: "GET",
//           }).then(function (response) {
//             console.log(response.data.results);
//           });
//         });
//       });

//       let listItemWrapper = $("<li>");
//       listItemWrapper.append(searchButton);
//       searchesList.append(listItemWrapper);
//     }
//   }

//   loadSearches();

//   function saveSearch(search) {
//     // if search is already in list, move to top
//     if (userSearches.includes(search)) {
//       userSearches.splice(userSearches.indexOf(search), 1);
//     }

//     userSearches.unshift(search);
//     localStorage.setItem("marvelSearches", JSON.stringify(userSearches));

//     // limits length of search list to 5
//     if (userSearches.length > 5) {
//       userSearches.length = 5;
//     }

//     // empties list
//     searchesList.empty();

//     // loops through userSearches and creates buttons, as well as event listener for getting info when clicked
//     for (let i = 0; i < userSearches.length; i++) {
//       var searchButton = $("<button>");
//       searchButton[0].classList.add("btn", "btn-card");

//       searchButton[0].innerHTML = userSearches[i];
//       console.log(searchButton);
//       console.log(userSearches);

//       searchButton.on("click", function (event) {
//         event.preventDefault();

//         let searchInput = event.target.innerHTML;
//         let marvelIdURL =
//           "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
//           searchInput +
//           "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//         saveSearch(searchInput);

//         // first ajax to turn the hero name in searchInput into an Id the API can use
//         $.ajax({
//           url: marvelIdURL,
//           method: "GET",
//         }).then(function (response) {
//           // store the first relevant character's id, log to be sure
//           var characterId = response.data.results[0].id;
//           console.log(characterId);

//           // logs all the relevant characters
//           console.log(response.data.results);

//           // new URL to search for comics of the chosen character
//           let marvelComicURL =
//             "https://gateway.marvel.com:443/v1/public/characters/" +
//             characterId +
//             "/comics?orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//           // second ajax to return the last 20 or so comics for the character, will update to 5 tomorrow, check log for results
//           $.ajax({
//             url: marvelComicURL,
//             method: "GET",
//           }).then(function (response) {
//             console.log(response.data.results);
//           });
//         });
//       });

//       let listItemWrapper = $("<li>");
//       listItemWrapper.append(searchButton);
//       searchesList.append(listItemWrapper);
//     }
//   }

//   // starting the onClick function for 'Search'
//   // $("#searchBtn").on("click", function (event) {
//   //   event.preventDefault();

//   //   let searchInput = $("#searchInput").val();
//   //   let marvelIdURL =
//   //     "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
//   //     searchInput +
//   //     "&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//   //   saveSearch(searchInput);

//   //   // first ajax to turn the hero name in searchInput into an Id the API can use
//   //   $.ajax({
//   //     url: marvelIdURL,
//   //     method: "GET",
//   //   }).then(function (response) {
//   //     // store the first relevant character's id, log to be sure
//   //     const characterId = response.data.results[0].id;
//   //     console.log(characterId);

//   //     // logs all the relevant characters
//   //     console.log(response.data.results);

//   //     // new URL to search for comics of the chosen character
//   //     let marvelComicURL =
//   //       "https://gateway.marvel.com:443/v1/public/characters/" +
//   //       characterId +
//   //       "/comics?orderBy=-onsaleDate&ts=1&apikey=6f68ec270b01384876787724cd124e64&hash=701330a00b13eb2a18e31cad8b72fe5b";

//   //     // second ajax to return the last 20 or so comics for the character, will update to 5 tomorrow, check log for results
//   //     $.ajax({
//   //       url: marvelComicURL,
//   //       method: "GET",
//   //     }).then(function (response) {
//   //       console.log(response.data.results);
//   //     });
//   //   });
//   // });
// });

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  superhero($("#searchInput").val());

  $("#searchInput").val("");
  $("#trending").addClass("hide");
  $("#searchResult").removeClass("hide");
});
