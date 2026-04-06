const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 PUT YOUR VALUES HERE
const APP_ID = "vpaas-magic-cookie-bef646f17b5d4bd0a4b6d0fb2558b906";  // full app id
const KID = "eb0e13"; // last part of your API key
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCtrfPUO6pSxZEe
7tBeKBPGhapOMIIKRXBAvKXtMEEJKwJ3fPnLITe21Nvt4iIu3E39hoVFjyeaIKfi
DyyXfFEhBb4JkVR6ioGixmgcp9XSlesPeIaoXk46+kXnOC/6Opn9Y7E4PuVBoev7
sW8DtJSmIt0qFidSXb6LHpcaidrG3GTMALg/Smj1UKuBCLaHiRCAaTQiejgzQYeI
VnYND+i9IpN/1z9IMREkyarnLY5RfmDiIVihumD/f1sKKSxyzthV9h4V6Mm+BZp2
ryi01Va5WGcKb9sAEhTzIhd932ItxppfKmVkSKg4ua3SDt40s9f8HZX0HqVC5Cv/
fP81N06jAgMBAAECggEBAJc7sOUuq0p2BL8FvuUuSsIEZF6/eIzPGEcWvflCmm8M
R5Kafbz2iNgok/WZgqCBb1wDBgui8x4Pr4B2LCMgulhh8q/MH96wut9tmvzQ3K0J
pGyNS9xSehZ7FeGYGJbw7mQpqgjLI8A56g353CxC02mzVBgwwD7FqITltzgBsEKV
+YOG5jfdBWqRWEfBaiMcFhzYUCuvmhxt24aowAu4lk7gQ1rcHcATCPxXG7g38N0s
eEFB0P4LxN4Z3jNoF6garG3OYSz/zEoW3Qtpu0GH1l7Wt7AHJRosX34ju7FRzwC6
woh+iq8GfD65j21kcpKSFrTMNnkKoIP1uxK+vPVlfQECgYEA3PZPWZ+etHwY9Au5
+1r9Ugfn5NxHG/xKGqCUnxVdBq/fKXSk7qfDIoB222tWQAm+499Ce0KucBRqfxQ0
2cct3CRStSHx/NHlfffClkGYZSPIfIq/hJkHnIJQGBYNSaejlOtPtGR6+tgKZ2CS
78JGssEa1PJxY1emcak84BqnNCMCgYEAyThCyZjMEwoOhvuIfidYfIuhnhDHBaQo
xo4HIrX3u7sPZOE95RtAWHx/Kta5OPwj5UHO5enEU+NUuEz4vKC3r6goehi7J2eS
4R95FAIB9VO0FqDWFzmx2hfZboElaXh6ZuwYcJU2PmBSel94FSf86Prrl3vArLju
Fqx2YD+J44ECgYB0cLhQGnWf1uWvdZ6EfuaPm+rwB8TRUpoafhTT4IYtR/Dp/7YK
rg1+2QPJjT7ecERQAQ8ftXwHRDr6zMMtIHFiWSHcog7LlDDDuRSp6ddNNRYpy1Qx
pBMGvwVGLBjEf7sMdxSBk5HbLo4M/C9yeYaYHHrvTPPDziTAMNcLogAK0QKBgQCT
cWxO+G2hDd9zPWDYv8/xAwfcIQMUuSM/ytajsp7iqsEu9HU8KenObPtp0olKnkdX
OA95HQBFT/DGU3B4F3RBfICcZv7McvKHj15TMN1qfHkbk6MMxbPy0UL73Boj3Kok
PJ/z7wIeVspY7Re6uOBzf1meWInohmG/r4PWJvjNAQKBgQCvFkWr6DeZmBbZd+tn
t21V/CU4FjBdDLI2VZKkPHK+kmVitgUavI3Zlnw0oP86ZbS8jUAsGsgX6gTVc0Hv
P+btjMrDONIsDhjjzFbJrsnsI8ycV8bWKKidg9rWmE+s/FP74XzI2I3LfHROK43s
7is2RpE5gIrbBJ89Y3lY4DYDSQ==
-----END PRIVATE KEY-----
`;

// 🔐 Generate JWT
app.post("/get-token", (req, res) => {
  try {
    const { userName } = req.body;

    const payload = {
      aud: "jitsi",
      iss: "vpaas-magic-cookie-bef646f17b5d4bd0a4b6d0fb2558b906",
      sub: "8x8.vc",
      room: "my-room",
      context: {
        user: {
          name: userName || "Guest",
        },
      },
    };

    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "1h",
      header: {
        kid: "eb0e13",
      },
    });

    res.json({ token });

  } catch (err) {
    console.error("JWT ERROR:", err); // 🔥 ADD THIS
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
