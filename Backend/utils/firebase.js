const admin = require("firebase-admin");
const serviceAccount = require("../tech-fe1e1-firebase-adminsdk-fbsvc-9a001fd810.json"); // adjust path if needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;
