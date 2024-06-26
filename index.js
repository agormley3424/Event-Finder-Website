const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const axios = require('axios').default;
var geohash = require('ngeohash');
var SpotifyWebApi = require('spotify-web-api-node');

const port = process.env.PORT || 3001;

app.use("/", express.static(__dirname + '/dist/my-app'));

app.use("/favorites", express.static(__dirname + '/dist/my-app'));

app.use("/search", express.static(__dirname + '/dist/my-app'));

// Instantiate Spotify Wrapper
const client_id = '0071111b9ea94493898caee6d25a95e4';
const client_secret = 'e02e456718dc4029a7ccc17c53766917';


// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: 'https://event-finder-417906.wl.r.appspot.com/json'
});

function refreshToken()
{
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}

refreshToken();


function searchArtist(artistName, req, res)
{
  refreshToken();
  spotifyApi.searchArtists(artistName)
  //.then(callBack(data), callBack(err));
  .then(function(data) {
    console.log("Artist search successful, printing JSON");
    console.log(data.body);
    //response = data.body;
    res.json(data.body);
  }, function(err) {
    console.log("Artist search unsuccessful, printing error:");
    console.error(err);
    //response = err;
    res.json(err);
  });
}

function searchAlbums(artistID, req, res)
{
  refreshToken();
  spotifyApi.getArtistAlbums(artistID, {limit: 3})
  .then(function(data) {
    console.log("Album search successful, printing JSON");
    console.log(data.body);
    //response = data.body;
    res.json(data.body);
  }, function(err) {
    console.log("Album search unsuccessful, printing error:");
    console.error(err);
    //response = err;
    res.json(err);
  });
}

// function processSpotify(returnVal)
// {
//   response = returnVal;
// }

//searchArtist("Cher", () => {});

app.get('/spotify', (req, res) => { 
  //res.sendFile("Angular/my-app/src/app/app.component.html", {root:__dirname});
  //res.sendFile("dist/my-app", {root:__dirname});
  

  searchArtist(req.query.artist, req, res);
  //console.log("Response is " + response);
  //res.json(response);
  //res.json({"foo": "bar"});
}); 

app.get('/spotifyAlbums', (req, res) => { 
  searchAlbums(req.query.artistID, req, res);
}); 

async function searchTicketMaster(req, res)
{
  const catTable = {"music":"KZFzniwnSyZfZ7v7nJ",
                    "sports":"KZFzniwnSyZfZ7v7nE",
                    "artstheatre":"KZFzniwnSyZfZ7v7na",
                    "film":"KZFzniwnSyZfZ7v7nn",
                    "misc":"KZFzniwnSyZfZ7v7n1",
                    "default":""};
  
  const locationSearch = req.query.locationSearch;

  var latitude;
  var longitude;

  //let waiting = false;

  if (locationSearch == "true")
  {
    var googleString = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDKkfBwag5d4vP1OXXbBBCNjceLG7IVk2Y&address=";
    
    let location = req.query.location.replaceAll(" ", "%20").replaceAll("+", "%2B").replaceAll(",", "");

    googleString += location;

    console.log("Google maps string: " + googleString);

    var googleAddy;
    //waiting = true;
    googleAddy = await axios.get(googleString);
    // .then((response) => {
    //   console.log("index.js line 112 Axios get SUCCEEDED");
    //   //console.log("Initial latitude is " + latitude);
    //   //waiting = false;
    // })
    // .catch((error) => {
    //   console.log("Error: index.js line 112: Axios get FAILED");
    //   //console.log(error);
    //   return;
    // });

    //console.log(googleAddy);
    googleAddy = googleAddy.data;
    latitude = googleAddy["results"][0]["geometry"]["location"]["lat"];
    longitude = googleAddy["results"][0]["geometry"]["location"]["lng"];
  }
  else
  {
    let ipv4 = req.headers['x-forwarded-for'].split(", ");


    // let ipAddy = req.query.location;
    var ipString = "http://api.ipstack.com/"
    + ipv4[0] + "?access_key=ac94c8269d57c9e41e868e4e334727f9";

    console.log("IP String: " + ipString);

    var ipJson = await axios.get(ipString);
    ipJson = ipJson.data;

    // var ipAddy = ipJson["loc"];

    // let returnAddresses = ["", ""];
    // let midIndex = -1;

    // for (let i = 0; i < ipAddy.length; i++)
    // {
    //   if (ipAddy[i] == ',')
    //   {
    //     midIndex = i;
    //     returnAddresses[0] = ipAddy.substring(0, i);
    //     break;
    //   }
    // }

    // returnAddresses[1] = ipAddy.substring(midIndex + 1);
    latitude = ipJson["latitude"];
    longitude = ipJson["longitude"];
  }

  //while (waiting) {};

  let latFloat = parseFloat(latitude);
  let longFloat = parseFloat(longitude);

  const precision = 7;

  //console.log("Latitude is " + latitude + ", and in float form it's " + latFloat);
  const geoPoint = geohash.encode(latFloat, longFloat, precision);

  let segmentID = catTable[req.query.category];

  let TMkey = "ZUe4QATYrGXNGmv3VGkGdAz0gC3XXeVo";

  let radius = req.query.distance;

  let keyword = req.query.keyword;

  var ticketMasterString = "https://app.ticketmaster.com/discovery/v2/events.json?" + "apikey=" + TMkey;
  console.log("Ticketmaster API Call: " + ticketMasterString);
  ticketMasterString += "&keyword=" + keyword;
  ticketMasterString += "&segmentId=" + segmentID + "&radius=" + radius;
  ticketMasterString += "&unit=miles&geoPoint=" + geoPoint;

  console.log("Ticketmaster string is " + ticketMasterString);

  axios.get(ticketMasterString)
  .then((response) => {
    console.log("index.js line 170 Axios get SUCCEEDED");
    console.log(ticketMasterString);
    return response.data;
  })
  .then((data) => {
    res.json(data);
  });

  return;
}

// async function getRequest(url)
// {

// }

app.get('/ticketMaster', (req, res) => {
  //res.json(searchTicketMaster(req));
  searchTicketMaster(req, res);
});

// app.get('/*', (req,res) => {
//   res.sendFile(__dirname + '/dist/my-app');
// });

// app.get('/favorites', (req, res) => { 
//   res.sendFile(path.join(__dirname));
// });

// app.get('/search', (req, res) => { 
//   res.sendFile(path.join(__dirname + "/search"));
// });

// app.get('/favorites', (req, res) => { 
//   res.sendFile(path.join(__dirname + "/search"));
// });

// app.get('/json', (req, res) => {
//   const json = {"key":5};
//   res.send(json);
// });

// app.get('/favorites', (req,res) => {
//   res.sendFile(path.join( __dirname + '/dist/my-app/index.html'));
// });

// app.get('/search', (req,res) => {
//   res.sendFile(path.join( __dirname + '/dist/my-app/index.html'));
// });

// app.get('/*', (req,res) => {
//   res.sendFile(path.join( __dirname + '/dist/my-app/index.html'));
// });

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));