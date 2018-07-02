require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var liriCommand = process.argv[2];
var liriSays = "";
var songTitle = "";
var movieTitle = "";

function myTweets() {
    var params = { screen_name: 'stevecodingbur1' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].created_at, null, 2))
                console.log(JSON.stringify(tweets[i].text, null, 2))
            }
        } else {
            throw error
        }
    });
}

function spotifyThis() {
    var nodeArgs = process.argv;

    if (process.argv[3] === undefined && songTitle === "") {
        spotify.search({ type: 'track', query: "Ace of Base The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
            console.log("Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
        });
    }
    else if (songTitle === "") {
        for (var i = 3; i < nodeArgs.length; i++) {

            songTitle = songTitle + " " + nodeArgs[i];
        }
        spotify.search({ type: 'track', query: songTitle }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var j = 0; j < 5; j++) {
                console.log("Artist: " + JSON.stringify(data.tracks.items[j].artists[0].name));
                console.log("Title: " + JSON.stringify(data.tracks.items[j].name));
                console.log("Preview: " + JSON.stringify(data.tracks.items[j].preview_url));
                console.log("Album: " + JSON.stringify(data.tracks.items[j].album.name));
                console.log("-----------------------");
            }
        });


    }
    else {
        spotify.search({ type: 'track', query: songTitle }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < 5; i++) {
                console.log("Artist: " + JSON.stringify(data.tracks.items[i].artists[0].name));
                console.log("Title: " + JSON.stringify(data.tracks.items[i].name));
                console.log("Preview: " + JSON.stringify(data.tracks.items[i].preview_url));
                console.log("Album: " + JSON.stringify(data.tracks.items[i].album.name));
                console.log("-----------------------");
            }
        });
    }
}

function movieThis() {
    var nodeArgs = process.argv;

    if (process.argv[3] === undefined && movieTitle === "") {
        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
    else if (movieTitle === "") {
        for (var i = 3; i < nodeArgs.length; i++) {

            movieTitle = movieTitle + " " + nodeArgs[i];
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
    else {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
}

if (liriCommand === "my-tweets") {
    myTweets()
}

else if (liriCommand === "spotify-this-song") {
    spotifyThis();
}

else if (liriCommand == "movie-this") {
    movieThis();
}

else if (liriCommand === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        var dataArr = data.split(",")
        for (var i = 0; i < dataArr.length; i++) {
        }
        liriSays = dataArr[0];
        if (liriSays === "my-tweets") {
            myTweets()
        }

        else if (liriSays === "spotify-this-song") {
            songTitle = dataArr[1];
            spotifyThis();
        }

        else if (liriSays === "movie-this") {
            movieTitle = dataArr[1];
            movieThis();
        }
    })
}