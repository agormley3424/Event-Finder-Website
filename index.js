const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.use("/", express.static(__dirname + '/dist/my-app'));

app.use("/favorites", express.static(__dirname + '/dist/my-app'));

app.use("/search", express.static(__dirname + '/dist/my-app'));

// Instantiate Spotify Wrapper
// const client_id = '0071111b9ea94493898caee6d25a95e4';
// const client_secret = 'e02e456718dc4029a7ccc17c53766917';



// var SpotifyWebApi = require('spotify-web-api-node');

// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId: client_id,
//   clientSecret: client_secret,
//   redirectUri: 'https://hw8-380107.wl.r.appspot.com/json'
// });

// void refreshToken()
// {
//   // Retrieve an access token.
//   spotifyApi.clientCredentialsGrant().then(
//     function(data) {
//       console.log('The access token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function(err) {
//       console.log('Something went wrong when retrieving an access token', err);
//     }
//   );
// }

// refreshToken();


// void searchArtist(artistName, callback)
// {
//   spotifyApi.searchArtists('Love')
//   .then(function(data) {
//     console.log("Artist search successful, printing JSON");
//     console.log(data.body);
//   }, function(err) {
//     console.log("Artist search unsuccessful, printing error:");
//     console.error(err);
//   });
// }

// searchArtist("Cher", () => {});


// app.get('/', (req, res) => { 
//   //res.sendFile("Angular/my-app/src/app/app.component.html", {root:__dirname});
//   res.sendFile("dist/my-app", {root:__dirname});
// }); 

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