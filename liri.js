// Requiring and configuring dotenv
require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];



// Accessing the Spotify API to retreive song information
function searchSpotify (input) {
    var input = process.argv[3];
    spotify.search({type: 'track', query: input}, function(error, data) {
        if (error) {
          console.log("An error occurred: " + error);
        } else {
            console.log(
                "Song title: " + data.body
            )
        }
       
      console.log(data); 
      });
}


// Accessing the Bands in Town API to get concert information
function searchBIT (input) {
    var input = process.argv[3];
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function(error, response) {
        if (error) {
            console.log("An error occured: " + error)
        } else {
            console.log(
                "Venue name: " + response.venue.name +
                "Location: " + response.venue.city +
                "Event Date: " + response.datetime
            );
        };
    })
};

// Accessing the OMDB API to get movie information
function searchOMDB (input) {
    var input = process.argv[3];
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log("An error occured: " + error)
        } else {
            // console.log(response);
            console.log(
                "Movie title: " + JSON.parse(body).Title +
                "\nReleased: " + JSON.parse(body).Year +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings
            )
        }
    })
}

// Creating a switch statement to loop through functions 
switch (command) {
    case "spotify-this-song":
    searchSpotify();
    break;

    case "concert-this":
    searchBIT();
    break;

    case "movie-this":
    searchOMDB();
    break;

    case "do-what-it-says":
    searchSpotify();
    break;
}

console.log(process.argv);