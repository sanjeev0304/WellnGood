
const axios = require('axios');
const admin = require('../utils/firebase');
const verifyToken = async (req, res, next) => {
    let idToken = req.cookies.AccessToken;
    const refreshToken = req.cookies.RefreshToken;
    
    try{
        const decoded = await admin.auth().verifyIdToken(idToken);
        req.user = decoded;
       return  next();

    }
    catch (error){
        console.error("Invalid Token")
    }

    if(refreshToken){
        try{
            const response = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
                new URLSearchParams({
                  grant_type: "refresh_token",
                  refresh_token: refreshToken
                }),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              );
              let newToken = response.data.id_token;
              const decoded = await admin.auth().verifyIdToken(newToken);
      
              res.cookie("AccessToken", newToken, {
                  httpOnly: true,
                  sameSite: "Strict",
                  maxAge: 3600 * 1000 
              });

              req.user = decoded;
              return next();
        }
        catch (error){
            console.error("Refresh token failed:", error);
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
    }
    else{
        return res.status(401).json({ "Message" : "Unauthorized" });
    }
}

module.exports = verifyToken;