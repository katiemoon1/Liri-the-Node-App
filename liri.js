// Requiring and configuring dotenv
require("dotenv").config();

var keys = require("keys.js");
var spotify = new Spotify(keys.spotify);
var spotify = require("node-spotify-api");

var songName = process.argv[2];

spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {
    console.log(
            "The name of the song is: " + response.album.name 
            // "\nThe name of the artist is: " + response.album.artists.name +
            // "\nThe album this song is found on is: " + response.albums +
            // "\nHere is a preview of the song: " + response.
            );
  })
  .catch(function(err) {
    console.log(err);
  });