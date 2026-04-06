const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 PUT YOUR VALUES HERE
const APP_ID = "vpaas-magic-cookie-bef646f17b5d4bd0a4b6d0fb2558b906";  // full app id
const KID = "52ab6a"; // last part of your API key
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTQgDuqagsKzSL
q5aLD5v4BOAIAzCdAwJRFm2lcEozPQ4buSXLX8a0+sp3iF6c2Vw31mHzvd2O3375
yHdGkjdGsuHlzD0t64JnHu8WUiZSuLDezuRAaOzY3YqNN3pTNPtyGnwj3JtHeVFE
JlTYEsZbaLSQvz8eHjiA6kA7h1gFLszyMsexHK2mBaCmWN/U4pwWdJPeLMPdhUl2
kyyrgAW2dQPJGU9sAdbuxb8NbagCC6ieRwYTN3V/orZSgTRUGISMd34hklgTVprC
nTa4+VdG+01CqTa7ytq11DGJU2QvNzX4Us6aOmm8qKfh8oysmucR8ETr9U1mB8nL
lyJ+AqV9AgMBAAECggEAfGUraHFFMVqmHr6qg3qCJPfpUJtxO5HJKTqrETBUXghb
nKvA85ZKw6N/2Y4HbrRnJHwjbsWbHhBKsTLZH3Jw43ZFQdxQajQiin4lNlPbL9H5
B576TjbUrTYozrZozVVae79H0vuO6MfhEJLY5Vam3Z0Lu6Ly7LxWuwAnlqH0hxsD
wmSHj6FnciR2JuB18GRBURvtMYVozbgO5XVSSZopg9j9oJ8UkoVbeknZOKNBv76c
PeHO96vJOitEvJcJ/C+QnCHoZyEe4Oh/+WP1m705nLeJYz94Nqvll2tp6Zgsf5s7
A4fJ5lTQfMOja1A7eKQqYXf6QfQlOtvkmI6d0w5KuQKBgQDGuTKK86fZSWc3F3w0
Uqjx0otaez0z4NEGqoXD6uTY6t52CCNsPkJ2U/4A8DupY/bZinSVQKSmTz3KAWGh
FU9m4w1/viVFufkNXQA/WtxXIyOkGBV593KcT+Re3+T0jOdLnzzfNsOZOufmZb3n
PVEO4CrnZlVHZOkUeZ4jbLUTFwKBgQC9s2sVCWX2cY6ki9ggFB1zO2f6l/ZZYWKy
sYvE0Gsk0GK166pew7eQB/fFWmg0tKntYa69GFROQoJbI5OvFgMlD87VddBQdcKm
WWDIkrHfRahpQepnqghy6anv6yYa9VWu9i52yoqe0W9e4FG6bvKs4KAbAlOERmJJ
nQQvWEX4iwKBgQCHzfpXcSns2Tf7M0aDL1YbZIotPHlX4bSXPKOLfxQDlYaP3QHw
MCAVY1L7azEqkpEYm4EOmo2qxg5w5T7F6Z1Ir7QC73vjSbOEyWCo6zwXJIFv27GZ
l1wwrHxhxdpesYhDasAbvv4u0k22ayM7SvEBHHrVhl6TGsgaYP6MMPcR4wKBgHul
n611k8U/nUc5c6TtF4kNdqfLNyJpLKjmuwCNDNlRDpYfRsw/67zwxJoZZIS+IWh9
3CSa4BCmn0sCdHeR9HjKxfkyspZPO5Gr/j6eB1xNjgkVktEA7kLgdQjRj+PQd4n0
IrMBL7t3LY18zyiiuoDeZN1V9dPpAJWUx66IbgsjAoGAGyC1c+vsf7BGdFhpOLbA
GM2gvmSScHGjnSkRVwkNX2uwLZx4BcrCsbFdbH69vwJqMU7IYAEnd3NDwqHQp0fg
KmaxNR0nkgsOF3Va//SIz/cQuQKnQK08KUqPevJkMKe8z+qTlwvGlv9Hn4gTd3VW
qIzotKi0C/BIFqOMu/nOKfc=
-----END PRIVATE KEY-----`;

// 🔐 Generate JWT
app.post("/get-token", (req, res) => {
  const { userName } = req.body;

  const ROOM_NAME = "my-room";

const payload = {
  aud: "jitsi",
 iss: APP_ID,
  sub: "8x8.vc",
  room: ROOM_NAME, // ✅ EXACT MATCH
  context: {
    user: {
      name: userName || "Guest",
    },
  },
};
  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "10h",
    header: {
      kid: KID   // ✅ IMPORTANT FIX
    }
  });

  res.json({ token });
});

app.listen(5000, () => console.log("Server running on port 5000"));
