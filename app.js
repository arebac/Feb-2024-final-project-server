var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
// var request = require("request");
// var crypto = require("crypto");
// var querystring = require("querystring");
var cookieParser = require("cookie-parser");
// var indexRouter = require('./routes/index');
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review.routes")
const playlistRoutes = require("./routes/playlist.routes")
const spotifyRouter = require("./routes/spotify.routes")
var app = express();

// Spotify API configuration
// var client_id = "9294120850024bd5a858d8f737d821d6"; // Your clientId
// var client_secret = "130ffb9ee7534341bdba008a6efba86b"; // Your secret
// var redirect_uri = "http://localhost:4000/callback"; // Your redirect uri
// const generateRandomString = (length) =>
//   crypto.randomBytes(60).toString("hex").slice(0, length);
// var stateKey = "spotify_auth_state";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(
  cors({
    origin: [process.env.REACT_APP_URI], // <== URL of our future React app
  })
);

// app.use(
//     cors()
//   );

app.use(express.static(__dirname + "/public")).use(cookieParser());


app.use("/spotify", spotifyRouter)
app.use("/users", usersRouter);
app.use("/playlist", playlistRoutes)
app.use("/auth", authRouter);
app.use("/reviews", reviewRouter)


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;



// app.get("/login", function (req, res) {
//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope =
//     "user-read-private user-read-email user-read-playback-state user-library-read playlist-read-private";
//   res.redirect(
//     "https://accounts.spotify.com/authorize?" +
//       querystring.stringify({
//         response_type: "code",
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state,
//       })
//   );
// });

// app.get("/callback", function (req, res) {
//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect(
//       "/#" +
//         querystring.stringify({
//           error: "state_mismatch",
//         })
//     );
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " +
//           new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//       },
//       json: true,
//     };

//     request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token,
//           refresh_token = body.refresh_token;

//         var options = {
//           url: "https://api.spotify.com/v1/me",
//           headers: { Authorization: "Bearer " + access_token },
//           json: true,
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function (error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect(
//           "http://localhost:5173/#" +
//             querystring.stringify({
//               access_token: access_token,
//               refresh_token: refresh_token,
//             })
//         );
//       } else {
//         res.redirect(
//           "http://localhost:5173/#" +
//             querystring.stringify({
//               error: "invalid_token",
//             })
//         );
//       }
//     });
//   }
// });

// app.get("/refresh_token", function (req, res) {
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//     },
//     form: {
//       grant_type: "refresh_token",
//       refresh_token: refresh_token,
//     },
//     json: true,
//   };

//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token,
//         refresh_token = body.refresh_token;
//       res.send({
//         access_token: access_token,
//         refresh_token: refresh_token,
//       });
//     }
//   });
// });

// app.use('/', indexRouter);


