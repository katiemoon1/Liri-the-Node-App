// Requiring and configuring dotenv
require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var songName = process.argv[2];
var artist = process.argv[3];

// Accessing the Spotify API to retreive song information
function searchSpotify (songName) {
    spotify.search({type: 'track', query: songName}, function(error, data) {
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
function searchBIT (artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response) {
        if (error) {
            console.log("An error occured: " + error)
        } else {
            console.log(
                "Venue name: " + response.venue.name +
                "Location: " + response.venue.city
            )
        }
    })
};

