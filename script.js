// makes sure html & css load before running the JS
$(document).ready(function () {
  // SEARCH
  // advance search options onclick handler
  $("#advanceBtn").on("click", function (event) {
    event.preventDefault();
    $(".search-options").removeClass("hide");
  });

  // TRENDING IN THE UNIVERSE
  function get_random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  // trigger a button click on the Enter key in a text box
  $("#searchInput").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#searchBtn").click();
    }
  });

  // superhero function that calls on the api
  function superhero(marvelCharacter) {
    const superqueryURL =
      "https://marvel-cors.mrof.workers.dev/corsproxy/?apiurl=https://www.superheroapi.com/api/9055872414486600/";

    $.ajax({
      url: superqueryURL + "search/" + marvelCharacter,
      method: "GET",
    }).then(function (response) {
      console.log(response);
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

  const pastSearchesNo = 5;
  // creates array in local storage to save users history
  let userSearches = JSON.parse(localStorage.getItem("userSearches"));
  if (userSearches == null) {
    userSearches = [];
  }
  // initialize with stored history
  populateHistory();

  // append current search to history
  function appendToHistory(search) {
    // check if new search is saved already in history section
    // if yes move this search to the top
    const index = userSearches.indexOf(search);
    if (index > -1) {
      userSearches.splice(index, 1);
    } else {
      if (userSearches.length === pastSearchesNo) {
        // if number of user searches is equal as defined globally, remove last element from array
        // userSearches.pop();
      }
    }
    // adds new user search to the top of the list
    userSearches.unshift(search);
    // clear user search history before it can display new searches
    $("#searches-list").empty();
    populateHistory();
  }

  // populate history display
  function populateHistory() {
    // creates search history section/ buttons
    const size =
      userSearches.length >= pastSearchesNo
        ? pastSearchesNo
        : userSearches.length;
    for (let i = 0; i < size; i++) {
      let lastSearch = $("<button>").text(userSearches[i]);
      lastSearch.attr("class", "btn btn-card");
      // click past search - display again hero
      lastSearch.on("click", function (event) {
        event.preventDefault();
        superhero(lastSearch.text());
        appendToHistory(lastSearch.text());
      });
      $("#searches-list").append(lastSearch);
    }
    localStorage.setItem("userSearches", JSON.stringify(userSearches));
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

            let heroName = randomHeroData.name;
            const bracketIndex = heroName.indexOf("(");
            if (bracketIndex >= 0) {
              heroName = heroName.substring(0, bracketIndex);
            }

            superhero(heroName);
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

        const noImg =
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

        if (
          randomComic.thumbnail.path != noImg &&
          randomComic.characters.items.length > 0
        ) {
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

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    superhero($("#searchInput").val());
    appendToHistory($("#searchInput").val());

    $("#searchInput").val("");
    $("#trending").addClass("hide");
    $("#searchResult").removeClass("hide");
  });
});
