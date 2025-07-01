const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        name: user.name,
        joinedOn: user.joinedOn,
        lastUpdated: user.lastUpdated,
        history : user.history
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  };

  const generateRefreshToken = (user) => {
    return jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        name: user.name,
        joinedOn: user.joinedOn,
        lastUpdated: user.lastUpdated,
        history : user.history
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
  };
  
module.exports = {
    generateAccessToken,
    generateRefreshToken
}