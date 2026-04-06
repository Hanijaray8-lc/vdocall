const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 PUT YOUR VALUES HERE
const APP_ID = "vpaas-magic-cookie-bef646f17b5d4bd0a4b6d0fb2558b906";  // full app id
const KID = "6d55ba"; // last part of your API key
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCC0vHZlU+NNHPT
PkYli9HtfedutYxt8XqDXDV/o9+uX5W+10PCXONJwXLBPzyfwajFFdbPqPpr7XiH
vkfNH5viAMY0Uz9oafn4kCsbYh3ZODMpnAUYZMXVLgt7Aji93nrwvQ14vAaHzZDu
E7IEGUAdtf+zq3Tekdqa1ceRA+3v4qu8iRpEC68dqDD78ZRwcr+6FFPwgDPzidx2
OQKNPk05Or7+6pRUVQjtf2AjWW1zucZe7oP6INgUdMOgFI64znwn8JRKVkGDnfaL
CBSnSfEiaM7iKGDxhMzAPzHuBX3di+bLe0b+buVohuAPYX+w3YS8JgkMj9LuzQGZ
d02lJWu7AgMBAAECggEAf3JLA8IOhqwzrfY71fX5Y9jE7jhU/wJBbNkWkSsvDKu3
sPv62c0t6ztWtOYLBENgS+ezpgejNiNYyTzYq/8AGFLSxETZP7oGOF0ScZHLLEMw
rHd/Cz2Y8M3zhzkp1+Z2dDJoflcGMaRUbWqogI+sw4T6/qioqO8EPNTInwBp+se6
mAwrBJujwF0tjYgQvjQrKE0nshEEhjpHOOXPBUt4wBh2YSoMvAhcUkxBtlNxhrxN
K2fOBeytWklb7g5U0Vpqq2c4Umly39IelgV/WqOgV35gHdLYMrkAIegP4qanQQGU
WOBQSWfE/15DV1tWNilTx3ZIvgtL/njU/tLVk4UIAQKBgQDSoDJlSZ10HlLkmR/R
+6z+JHA37KMpUXF6JKDT/cnebMFXroT+8UucsP+pkjWSTMTjLUWpIftVniF2i9K8
rZBH1d5PU7oZ9r3MFv3raACwNlH492XMWzCyQhBX5aEJV9A8Dr52NIzXM6IuL1B2
vyaOuJL/QSmtzY06gu6hQpm/uwKBgQCfAcJgHRV5XEQ8xfsmlu57O3YeOTrWnT2D
HhHOBKUIyhZtC6DoWfl3fCSIQ7U5hyyfcnPeawYADO5pcTFyASx1EfPYRQE31i9q
iCsJBUcZuAMgHKcvnMZ9NVZ7Af6oMWGmyjUhXGGw5WVQw/3pDIiSqH5X4+4lcY1k
TFMoffpEAQKBgQCPzN+bV48wYCOn/wNCkdmiCa6z/9PFud0Hz0oecf8I5Kd7/aK/
jG5bJFzooPICWHdzwsz0lEbMRZIDJaNTPgxrfxCwiDFe2J7sYCYsOm194RhGKmJO
C1RL397Yo+Y2QsXguxA+E9K0eoQXlCYTbJ4egtWZgBu8lcH+WLYjUx01UQKBgFIt
CJW/si9sXd/Cug+xhUKu8lagYSY1UWsICU+d2uT1/C0TC2/JwEHeKMs7otc+YvNs
pTFXwlwYUsavt0wiCyXdx1YII58F1K+L/CHHVn2WOhdId6cFsRdYj383ArNOAhe+
/UJmih5wD7Jz+C+PSK3y4ojtxVAYpWgmgfu1T7gBAoGALVBp6j0WYh7nSvUHUybM
kEWwQzxRngu9Qz/5OlLly18hjD+iDwaGd6hFA+StsED5xpqZHZu4uXdHsOx+AKIx
h/I6zLYKUZ8qqwfok0FzRls0teEcUXvM/pjoc8gdS4cyUxq5Ai9lIxqFwJw4wMOk
CIFsg66+S7tEcuvioOOoySE=
-----END PRIVATE KEY-----

`;

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
