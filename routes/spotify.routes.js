const router = require("express").Router();
const axios = require("axios");

async function getSpotifyAccessToken() {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "client_credentials",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
  });

  return response.data.access_token;
}

// Is this some generic code to get the token and then where is it saving the spotify token?

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(500).json({ message: "Please provide query" });
    }

    const token = await getSpotifyAccessToken();



    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: query,
        type: 'track'
      }
    });


    return res.status(200).json(response.data)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
