# fantastic-four-marvel-search

The Fantastic Four's first project for Module 9 of Bootcamp.

Deployed Appliation can be found at : (**insert link**)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Description

A marvel hero search application that allows a user to search for a marvel
character.

Page runs in the browser and features dynamically updated HTML and CSS.

Application uses the [Marvel API](https://developer.marvel.com/) to retrieve
comic and creator data for characters.

You will need to register for an API key in order to use this API, with a limit
of 3000 calls per day.

A timestamp and hash will also be required for authentication (you can find more
about that [here](https://developer.marvel.com/documentation/authorization)).

Application also uses the [Superhero API](https://superheroapi.com/) to work
fetch nickname, full name, alignment, first appearance, and group affiliation.
Be sure to read the documentation carefully!

## Installation

Add the Bootstrap library links right before your css and closing `</head>` tag
in html files:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
  crossorigin="anonymous"
></script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
/>
```

Add CSS right before closing `</head>` tag in html files (before title):

```html
<link rel="stylesheet" href="./styles.css" />
```

Add JavaScript right before closing `</body>` tag in the html file.

JQuery library:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

Your own script code:

```html
<script src="./script.js"></script>
```

## Usage

(Note that, upon opening the website, random comic and character information
will be displayed by default.)

To use the program, click on the search bar to enter a character of your
choosing. Once entered, click 'Search'.

The website will now display various information about said character for your
viewing pleasure.

The last 5 searches will be saved in a list, to the right of the search bar.
Clicking any particular saved character in this list will fetch the relevant
information for them once more.

The following video shows the application's appearance and functionality:

MISSING

## Credits

- Jwray99
- EAmrogowicz
- ExxtremeBattler
- Bootcamp for teaching us the skills required for this project.

## License

Please refer to the LICENSE file in the repository.
