const express = require("express");

require("dotenv").config();

const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParser());


const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log("Server is running on port");
})

