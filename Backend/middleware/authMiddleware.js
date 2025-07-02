const jwt = require('jsonwebtoken');
const axios = require('axios');
const admin = require('../utils/firebase');
const User = require('../model/User');
const { generateAccessToken } = require('../utils/generateTokens');

const isFirebaseToken = (token) => {
  try {
    const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
    return header.alg === 'RS256';
  } catch (e) {
    return false;
  }
};

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.AccessToken;
  const refreshToken = req.cookies.RefreshToken;


  if (accessToken) {
    if (isFirebaseToken(accessToken)) {

      try {
        const decodedFirebase = await admin.auth().verifyIdToken(accessToken);
        req.user = decodedFirebase;
        return next();
      } catch (err) {
        console.warn("Firebase token invalid:", err.message);
      }
    } else {

      try {
        const decodedJWT = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
          algorithms: ["HS256"]
        });
        req.user = decodedJWT;
        return next();
      } catch (err) {
        console.warn("Manual JWT invalid:", err.message);
      }
    }
  }


  if (refreshToken) {
    try {
      const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
        algorithms: ["HS256"]
      });

      const user = await User.findOne({ email: decodedRefresh.email });
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken(user);
      res.cookie('AccessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 3600 * 1000
      });

      req.user = jwt.decode(newAccessToken);
      return next();
    } catch (err) {
      console.error("Manual JWT refresh failed:", err.message);
    }
  }

  // --- Firebase Refresh Flow ---
  if (refreshToken && isFirebaseToken(refreshToken)) {
    try {
      const response = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const newFirebaseToken = response.data.id_token;
      const decoded = await admin.auth().verifyIdToken(newFirebaseToken);

      res.cookie('AccessToken', newFirebaseToken, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 3600 * 1000
      });

      req.user = decoded;
      return next();
    } catch (err) {
      console.error("Firebase refresh failed:", err.message);
    }
  }

  return res.status(401).json({ message: "Unauthorized. No valid token found." });
};

module.exports = verifyToken;
