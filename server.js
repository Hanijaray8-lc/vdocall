const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());

// 🔴 REPLACE THESE
const APP_ID = "vpaas-magic-cookie-bef646f17b5d4bd0a4b6d0fb2558b906/eb0e13";
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCsSXh5yw1rwwu
5mcDLkg6SrZv0i1QRCl3KnmQGcNZWp2dNDqFwlrQMxyKZEYUR45OJV/M1Hf2G3eG
vqEf/jYk51doCfUZEDvkG03S4HsRT9RrL4sEqsnXnJ45UcPem/iaLg84VCGqMSNZ
07kr/Ue9MsWIj0cnJqZOjrJxf+TKEuS5fOzQ34cDQaQz+5CA4We6Ct7Xy188dUMU
DDs/YVXoD8wzchzop5rsPwYltyyK9xj9MEA4nPyjZO6nb75sH+1vruWv7Lwmn3NL
xX9MLXD2bodnk1fAlDKwg5LEoo2n3lUkY1vxZeyWfC2fNVyOtUZiGRVV5UXKOe/i
7lAzmesFAgMBAAECggEAPTMkXluluQZahQ+mCAjvaWt856+g0N9sTWpLpjGDB76F
VxpI3y0WEOZQLWyR3uQTZps2/xM21mUR8IhR69WkPXt/LVQb+JHy0aSHlSc9aFa4
xiy+vWvWYPF5hzkdogdTYVvjKui/YFlr7FuylJJcj6u7Dk9DpZnvozgV/bmfOKmk
hjOKdRwW027SgFmvGV8f+cwS1QOe6fj2NP66hPJSi05ou26aMHPVtgCcFOppXyz8
n5YsKGvWrhA0q0Zi83/2vr9sflXPdxZZrZWT7w7h4dRWdRTCUMQFeOI97uuE5FfO
LuWhtJXWTEnOGN6DiyVkEF2HmVn/O7hg6jGT9VvCgQKBgQD5bA711FCRXzzWjR51
YKQXXvmS2CcrdVQyHOjPZAzKYiNiTT5QwCK5gFBqP3htMqohC2va0Xt5+oriskrP
J0uvtefjULIvjUNABUEhek2rNlq0duNR5PA0W0444KaoYXYoo8EgYdKXBDfFP+N8
E6IrcPJeU5/o1WPYsJv+fyOh5QKBgQDH05YLdR1FALaHc7BQolSiX0RjHGdAMnJY
p6V1h1dJAh2F5fZKZjRN+EYdrROi1L+YBDkidBeEpigWxnHKTRsxoDONba1S13IW
H55hnUyuBOSi/kRkLn8yB1J4CRJaT26w9grYNScpjgp4XpEPmBqbuMCE5NmOJPHE
5pAgiKMSoQKBgDcdq8ii3BLjqrv2fy6M5nXLpPbQEQfHa42PWdrKTxFB0nPcgdKy
QnofYqW31NK8iV+3+GNoOxLfTGV/5IwWMOFpHw7aPCXJ33x8LMJLFnKpFi4ev2jP
YE0RiB2Fdw5qSwP7+6c+Npzsb66Eya4XYJSc5tH1RLbcwK2XiUEZszQJAoGBALby
Z1/sBDUllvdiGp1oUXYrJHBdE8a5qOiz7A8zLt2fuynYxWmOMvrjgEYxLFYa06K4
0xpRESsX+IIJgyqE942yryAfttyudTv+DMIwAoEb57u2cSULUNabz4woOg5GxP/s
8zbJSyaHbdyQL90IE+xX9KJ25xt1hYgQ0wmGL06hAoGACqsZ3D9pz4DOWKr5oi1A
f+SZVzj8fYbmfOFptdembh2GEKILIF2skamcCMPCNbo3OuEhyTkwd05zV7bBg/Je
unJ+MHNi5irziIMPpvwL2oks9Yf2aDgVhskB3/+GQPxWmeCFgYcQ60JF83NxFl4K
kdk6w2RtiVYA1SSrQwMtLFo=
-----END PRIVATE KEY-----
`;

app.get("/api/token", (req, res) => {
  const payload = {
    aud: "jitsi",
    iss: "chat",
    sub: APP_ID,
    room: "*",
    context: {
      user: {
        name: "Guilda",
        email: "user@email.com",
        moderator: true
      }
    }
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "2h"
  });

  res.json({ token });
});

app.listen(5000, () => console.log("Server running on port 5000"));