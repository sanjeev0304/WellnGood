const express = require("express");

require("dotenv").config();

const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require('./model/modelConfig');
const authRoutes = require("./routes/authRoutes");
connectDB();

const app = express();


app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
