// FILE: MAIN.js | PROJECT NAME: Pokemon Smackdown

// Start Custom Scripts

window.onload = function() {

  project.init();

};

var project = {};

// $(function(){
//   $.ajaxSetup({
//     beforeSend: function(xhr) {
//       xhr.setRequestHeader('Cache-Control', null);
//     }
//   });
// });

project.init = function(){

  //pokemon query
  //http://pokeapi.co/api/v2/pokemon?limit=802
  //Sprite:
  //http://pokeapi.co/media/sprites/pokemon/1.png <-- Bulbasaur is #1

  var mainRef = new Firebase('https://pokemon-c1a19.firebaseio.com/');

  var pokemonData = {};
  var pokemon2Data = {};
  var pokemonChar = {};
  var pokemon2Char = {};

  $.getJSON("http://pokeapi.co/api/v2/pokemon?limit=151", function(data) {
    pokemon2Data = data.data.results;
    setFirebaseData(pokemon2Data, "pokemon2");
  });

  // Example pokemonData:
  // {
  //   "count": 811,
  //   "next": "http://pokeapi.co/api/v2/pokemon/?limit=802&offset=802",
  //   "previous": null,
  //   "results": [
  //     {
  //       "name": "bulbasaur",
  //       "url": "http://pokeapi.co/api/v2/pokemon/1/"
  //     },
  //     ...
  //     {
  //       "name": "mew",
  //       "url": "http://pokeapi.co/api/v2/pokemon/151/"
  //     }
  //   ]
  // }


  $.getJSON("http://pokeapi.co/api/v2/pokemon?limit=802", function(data) {
    pokemonData = data.results;
    setFirebaseData(pokemonData, "pokemon");
  });

  // Example pokemonData:
  // {
  //   "count": 811,
  //   "next": "http://pokeapi.co/api/v2/pokemon/?limit=802&offset=802",
  //   "previous": null,
  //   "results": [
  //     {
  //       "name": "bulbasaur",
  //       "url": "http://pokeapi.co/api/v2/pokemon/1/"
  //     },
  //     ...
  //     {
  //       "name": "mew",
  //       "url": "http://pokeapi.co/api/v2/pokemon/151/"
  //     }
  //   ]
  // }


  function setFirebaseData(data, type) {
    //JARED, DO YOUR CODE AFTER THIS LINE, IN THIS FUNCTION
    var ref = new Firebase('https://pokemon-c1a19.firebaseio.com/' + type);

    // CHECK IF "type" is "pokemon" or if "type" is "pokemon2"
    // If "type" is equal to "pokemon", do the stuff below.
    if (type === "pokemon") {


      // Use the "data" from "pokemonData" to construct a new array using the "forEach" method
      // Declare a new array variable - var something = [];
      var pokeCharacters = [];
      pokemonData.forEach(function(element, index, array) {
        pokeCharacters[index] = {
          "name": element.name,
          'imageURL': 'http://pokeapi.co/media/sprites/pokemon/' + (index + 1) + '.png'
        }
      });


      //Run the forEach method on pokemonData.
      // Example "forEach" method:
      // pokemonData.forEach(function(element, index, array) {
      //   ... your code here...
      //   something[index] = {...};
      // });
      //
      //New Array Example:
      // [
      //   {
      //     'name': 'bulbasaur',
      //     'imageURL': 'http://pokeapi.co/media/sprites/pokemon/' + (index + 1) + '.png'
      //   },
      //   {
      //     'name': 'ivysaur',
      //     'imageURL': 'http://pokeapi.co/media/sprites/pokemon/' + (index + 1) + '.png'
      //   }
      // ]

      // SET the new array as the new firebase pokemon reference "ref"
      ref.set(pokeCharacters);
    }

    // If "type" is equal to "pokemon2", do the stuff below.
    if (type === "pokemon2") {


      // Use the "data" from "pokemonData" to construct a new array using the "forEach" method
      // Declare a new array variable - var something = [];
      var poke2Characters = [];
      pokemon2Data.forEach(function(element, index, array) {
        poke2Characters[index] = {
          "name": element.name,
          'imageURL': 'http://pokeapi.co/media/sprites/pokemon/' + (index + 1) + '.png'
        }
      });

      //Run the forEach method on pokemon2Data.
      // Example "forEach" method:
      // pokemon2Data.forEach(function(element, index, array) {
      //   ... your code here...
      //   something[index] = {...};
      // });
      //
      //New Array Example:
      // [
      //   {
      //     'name': '3-D Man',
      //     'imageURL': pokemon2Data.thumbnail.path + "standard_fantastic" + pokemon2Data.thumbnail.extension
      //   },
      //   {
      //     ...etc...
      //   }
      // ]

      // SET the new array as the new firebase pokemon2 reference "ref"
      ref.set(pokemon2Characters);
    }
  }



  // NO MORE FOR JARED







  function getFirebaseData(type, cb) {
    //ERIN, DO YOUR CODE AFTER THIS LINE, IN THIS FUNCTION
    var getRef = new Firebase('https://pokemon-c1a19.firebaseio.com/' + type);

    // Watch the data from firebase reference for changes/updates/ and get the data.
    //You'll us the ".on()" method linked below
    // https://www.firebase.com/docs/web/api/query/on.html

    getRef.on('value', function(data) {
      var fireArr = data.val();

      // In the calback function of ".on()"
      // Generate a random whole number between 1 and the length of the received array.

      var charIndex = Math.floor(Math.random() * (fireArr.length - 0));

      // Use that random number as an index for the received array to grab a random character.
      // Set var character to the index of the received array.

      var charObj = fireArr[charIndex];

      // If "type" is equal to "pokemon", use "var pokemonChar".

      if (type === 'pokemon') {
        // Get the html dom element with ID of "pokemonName" and set its "innerText" to "pokemonChar.name"
        $('#pokemonData').text(charObj.name);

        // Get the html dom element with ID of "pokemonImg" and set its "src" "attribute" to "pokemonChar.imageURL"
        $('.pokemon-image').attr('src', charObj.imageURL);
        cb(charObj.name);
      }

      else if (type === 'pokemon2') {
        // Get the html dom element with ID of "pokemon2Name" and set its "innerText" to "pokemon2Char.name"
        $('#pokemon2Data').text(charObj.name);

        // Get the html dom element with ID of "pokemon2Img" and set its "src" "attribute" to "pokemon2Char.imageURL"
        $('.pokemon2-image').attr('src', charObj.imageURL);
        cb(charObj.name);
      }

      else {
        console.log('error occured in dom manipulation');
      }

    });
    // NO MORE FOR ERIN


  }

  function smackdown() {
    var arr = [];
    var i = 0;
    getFirebaseData("pokemon2", function(name) {
      arr[0] = name;
      i++
      if (i === 2) {
        var winnerIndex = Math.floor(Math.random() * (arr.length - 0));
        $('#winner').text(arr[winnerIndex]);
      }
    });
    getFirebaseData("pokemon", function(name) {
      arr[1] = name;
      i++
      if (i === 2) {
        var winnerIndex = Math.floor(Math.random() * (arr.length - 0));
        $('#winner').text(arr[winnerIndex]);
      }
    });
  }


  $('#button').click(function() {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      smackdown();
    }
  });



};
