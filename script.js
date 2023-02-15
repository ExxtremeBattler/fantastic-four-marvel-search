// makes sure html & css load before running the JS
$(document).ready(function () {
  // advance search options onclick handler
  $("#advanceBtn").on("click", function (event) {
    event.preventDefault();
    $(".search-options").removeClass("hide");
  });

  // get random from arrays
  function get_random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  // trigger a button click on the ENTER key in a text box
  $("#searchInput").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#searchBtn").click();
    }
  });

  // superhero function that calls on the API
  function superhero(marvelCharacter) {
    const superqueryURL =
      "https://marvel-cors.mrof.workers.dev/corsproxy/?apiurl=https://www.superheroapi.com/api/9055872414486600/";

    $.ajax({
      url: superqueryURL + "search/" + marvelCharacter,
      method: "GET",
    }).then(function (response) {
      // error catch
      if (response.response === "error") {
        $(".modal").modal("show");
      } else {
        const hero = {
          name: response.results[0].name,
          publisher: response.results[0].biography.publisher,
          appearance: response.results[0].biography["first-appearance"],
          fullName: response.results[0].biography["full-name"],
          aliases: response.results[0].biography["aliases"],
          alignment: response.results[0].biography.alignment,
          group: response.results[0].connections["group-affiliation"],
          img: response.results[0].image.url,
        };

        $("#hero-name").text(hero.name);
        $("#bio-publisher").text(hero.publisher);
        $("#bio-nickname").text(hero.aliases);
        $("#bio-fullname").text(hero.fullName);
        $("#bio-appearance").text(hero.appearance);
        $("#bio-alignment").text(hero.alignment);
        $("#bio-group").text(hero.group);
        $("#bio-img").attr("src", hero.img);

        // check publisher and hide carousel accordingly
        if (hero.publisher === "DC Comics") {
          $("#carouselExampleCaptions").addClass("hide");
          $("#carousel-title").addClass("hide");
        } else {
          $("#carouselExampleCaptions").removeClass("hide");
          $("#carousel-title").removeClass("hide");
        }
      }
    });
  }

  // SEARCH HISTORY
  // limits visible searches on screen
  const pastSearchesNo = 5;
  // creates array in local storage to save users history
  let userSearches = JSON.parse(localStorage.getItem("userSearches"));
  // create new empty array if there is nothing in the local storage
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
    }
    // adds new user search to the top of the list
    userSearches.unshift(search);
    // clear user search history before it can display new updated searches
    $("#searches-list").empty();
    populateHistory();
  }

  // populate history display
  function populateHistory() {
    // check how many buttons should be displayed on screen
    const size =
      userSearches.length >= pastSearchesNo
        ? pastSearchesNo
        : userSearches.length;

    for (let i = 0; i < size; i++) {
      let lastSearch = $("<button>").text(userSearches[i]);
      lastSearch.attr("class", "btn btn-card");

      // click handler - display again hero
      lastSearch.on("click", function (event) {
        event.preventDefault();
        superhero(lastSearch.text());
        $("#trending").addClass("hide");
        $("#searchResult").removeClass("hide");

        //initialize function
        appendToHistory(lastSearch.text());
      });
      $("#searches-list").append(lastSearch);
    }
    // save the search to local storage
    localStorage.setItem("userSearches", JSON.stringify(userSearches));
  }

  // TRENDING IN THE UNIVERSE
  // search for random superhero from Marvel API
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
      // check list length
      while (allHeros.length > 0) {
        const randomHero = get_random(allHeros);

        const noImg =
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

        // filter out elements if there is no image available or character wasn't in any series
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

          // click handler - search data for that hero and display (initialize superhero)
          $("#card-hero-link").on("click", function (event) {
            event.preventDefault();

            let heroName = randomHeroData.name;
            // remove brackets from API name result
            const bracketIndex = heroName.indexOf("(");
            if (bracketIndex >= 0) {
              heroName = heroName.substring(0, bracketIndex);
            }

            superhero(heroName);
            $("#trending").addClass("hide");
            $("#searchResult").removeClass("hide");
          });

          return;
        } else {
          // remove this name from the pool
          allHeros.splice(allHeros.indexOf(randomHero), 1);
        }
      }
      // No hero matching this letter can be used, try with different letter
      trendingHero();
    });
  }

  // search for random superhero from Marvel API
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
      // check list length
      while (allComics.length > 0) {
        const randomComic = get_random(allComics);

        const noImg =
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

        // filter out elements if there is no image available or character wasn't in any series
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
          // remove this comic from the pool
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

      // check list length
      while (allCreators.length > 0) {
        const randomCreator = get_random(allCreators);

        const noImg =
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

        // filter out elements if there is no image available or character wasn't in any series
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
          // remove this creator from the pool
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

  // MAIN SEARCH CLICK HANDLER
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    if (!$("#searchInput").val() /* add conditions for no api results too */) {
      $(".modal").modal("show");
    } else {
      superhero($("#searchInput").val());
      appendToHistory($("#searchInput").val());
      // clears search input filed
      $("#searchInput").val("");
      $("#trending").addClass("hide");
      $("#searchResult").removeClass("hide");
    }
  });
});
