var TwitterPackage = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var key = require('./keys.js');
var fs = require('fs');



var getTweets = function(){
	var Twitter = new TwitterPackage(key.secret);
	var params = {screen_name: 'violetsaturn1'};
	Twitter.get('statuses/user_timeline', params, function(error, tweets, response){
	 if (!error){
		for(i=0; i<tweets.length; i++) {
			console.log(tweets[i].created_at);
			console.log(' ');
			console.log(tweets[i].text);
			console.log(' ');
		}
	}
});

}

var findArtist = function(artist) {
	return artist.name;
}

var runSpotify = function(songName) {
Spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    var thisSong = data.tracks.items;
    for(i=0;i<thisSong.length;i++){
    	console.log("Artist: " + thisSong[i].artists.map(findArtist));
    	console.log("Song Title: " + thisSong[i].name);
    	console.log("Album Title: " + thisSong[i].album.name)
    	console.log("====================================================");
    }

    
   });
}

var getMovie = function(movie) {
	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function(error, response, body){
		if(!error && response.statusCode == 200) {

			var jsonData = JSON.parse(body);

			console.log("Movie Title: " + jsonData.Title);
			console.log("Year: " + jsonData.Year);
			console.log("Rated: " + jsonData.Rated);
			console.log("IMDB Rating: " + jsonData.imdbRating);
			console.log("Country: " + jsonData.Country);
			console.log("Language: " + jsonData.Language);
			console.log("Plot: " + jsonData.Plot);
			console.log("Actors: " + jsonData.Actors);
			console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
			console.log("Website: " + jsonData.Website);


		}
	});
}

var justDoIt = function(){
	fs.readFile("random.txt", "utf-8", function(err, data){
		if(err) throw err;

		var dataArray = data.split(",");
		if(dataArray.length == 2) {
			alternate(dataArray[0], dataArray[1]);
		}else if(dataArray == 1) {
			alternate(dataArray[0]);
		}
	})
}


var alternate = function(caseData, functionData) {
	switch(caseData){
		case undefined :
			getTweets();
			break;
		case "my-tweets" :
			getTweets();
		break;
		case "spotify-this-song" :
			runSpotify(functionData);
			break;
		case "movie-this" :
			getMovie(functionData);
			break;
		case "do-what-it-says" :
			justDoIt();
			break;
		default:
		console.log("liri doesn't know how to do that");
	}
}

var runThis = function(argOne, argTwo) {
	alternate(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);
