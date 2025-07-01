const jwt = require('jsonwebtoken');
const axios = require('axios');
const admin = require('../utils/firebase');
const User = require('../model/User');
const generateAccessToken = require('../utils/generateTokens');

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.AccessToken;
  const refreshToken = req.cookies.RefreshToken;

 
  try {
    const decodedJWT = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedJWT;
    return next();
  } catch (err) {
    console.warn('JWT AccessToken invalid or expired:', err.message);
  }

 
  if (refreshToken) {
    try {
      const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
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

      req.user = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET);
      return next();
    } catch (err) {
      console.error('JWT refresh failed:', err.message);
    }
  }

  // If not JWT, fall back to Firebase Google Auth
  
  try {
    const decodedFirebase = await admin.auth().verifyIdToken(accessToken);
    req.user = decodedFirebase;
    return next();
  } catch (err) {
    console.warn('Firebase token invalid:', err.message);
  }

  // Firebase refresh using Google secure token
  if (refreshToken) {
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
      console.error('Google token refresh failed:', err.message);
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
  }

  return res.status(401).json({ message: 'Unauthorized. No valid token found.' });
};

module.exports = verifyToken;
