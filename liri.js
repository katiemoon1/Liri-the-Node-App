// Requiring and configuring dotenv
require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

// Accessing the Spotify API to retreive song information
function searchSpotify (input) {
    // Allowing the input to search multi-word songs
    var input = process.argv.slice(3).join(" ");
    //Searching Spotify for track information
    spotify.search({type: "track", query: input}, function(error, data) {
        if (error) {
          console.log("An error occurred: " + error);
        } else {
            console.log(
                "Song title: " + data.tracks.items[0].name +
                "\nArtist: " + data.tracks.items[0].artists[0].name +
                "\nAlbum: " + data.tracks.items[0].album.name +
                "\nSong preview: " + data.tracks.items[0].href
            )
        }
    });
};

// Accessing the Bands in Town API to get concert information
function searchBIT (input) {
    // Allowing the input to take more than single word bands
    var input = process.argv.slice(3).join(" ");
    // Requiring moment to format the concert date
    var moment = require("moment");
    // Bands in Town Request
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (error) {
            console.log("An error occured: " + error)
        } else {
            // console.log(body);
            console.log(
                "Lineup: " + JSON.parse(body)[0].lineup +
                "\nVenue name: " + JSON.parse(body)[0].venue.name +
                "\nLocation: " + JSON.parse(body)[0].venue.city +
                "\nEvent Date: " + moment(JSON.parse(body)[0].venue.datetime).format("MM/DD/YYYY")
            );
        };
    })
};

// Accessing the OMDB API to get movie information
function searchOMDB (input) {
    // Allowing the input to take more than single word movies
    var input = process.argv.slice(3).join(" ");
    // OMDB request
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log("An error occured: " + error)
        } else {
            console.log(
                "Movie title: " + JSON.parse(body).Title +
                "\nReleased: " + JSON.parse(body).Year +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                "\nThe movie was produced in: " + JSON.parse(body).Country +
                "\nLanguage: " + JSON.parse(body).Language +
                "\nThe Plot: " + JSON.parse(body).Plot +
                "\nThe Actors: " +  JSON.parse(body).Actors
            );
        }
    })
};

// Accessing the random.txt file to search via Spotify
function doAsFileSays () {
    // Requiring fs
    var fs = require("fs");
    // // Making input equal to the file
    // var input = data;
    // Reading the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            console.log("An error occured: " + error)
        } else {
           console.log(data);
           var information = data.split(",");
           searchSpotify(information);
           console.log(information);
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
    doAsFileSays();
    break;
}

// Used to take a look at the process.argv array to ensure that I am pulling the correct string
console.log(process.argv);