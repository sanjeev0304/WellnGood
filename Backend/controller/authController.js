const express = require('express');
const User = require('../model/User');
const generateInitialData = require('../utils/generateInitialData');
const generateNextDayData = require('../utils/generateNextDayData');
const getThreeMonthAverages = require('../utils/getThreeMonthAverages');
const {generateAccessToken, generateRefreshToken} = require('../utils/generateTokens');
const axios = require('axios');
const bcrypt = require('bcryptjs');

const predict = async(req, res) => {

   const user = await User.findOne({email});

    const response = await axios.post('http://127.0.0.1:5000/api/predict',{
        Heart_Rate,
        Blood_Oxygen_Level,
        Sleep_Duration,
        Steps,
        Calories_Burned,
        Distance_Covered
    });
    console.log(response);
    return response;

}
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                "Mesasage": "User Not Found"
            });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;

        const exisitingCluster = user.cluster;
        if(!exisitingCluster){
            const clusterResponse = await axios.post('http://127.0.0.1:5000/api/predict',{
                "Heart_Rate": today.heartRate,
                "Blood_Oxygen_Level": today.bloodOxygen,
                "Sleep_Duration": today.sleepHours,
                "Steps": today.steps,
                "Calories_Burned": today.calories,
                "Distance_Covered": today.distance
            });
    
            const Cluster = clusterResponse.data.predicted_cluster
            newUser.cluster = Cluster;
            await newUser.save();
        }

        const current = new Date();
        const last = new Date(user.lastUpdated);
        let diff = current - last;

        if (diff > 24 * 60 * 60 * 1000) {
            const updatedData = generateNextDayData(user.history.at(-1))
            user.history.push(updatedData);
            user.lastUpdated = current.toISOString();
            await user.save();
        }

        const today = user.history.at(-1);
        const avg = getThreeMonthAverages(user.history);

        res.cookie("AccessToken", accessToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 3600 * 1000

        });

        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            "Message": "Login Sucessful",
            "Name": user.name,
            "Email": user.email,
            "Cluster" : user.cluster,
            threeMonthAvg: avg,
            today
        });
    }
    catch (error) {
        res.status(500).json({
            "Message": "Internal Server Error"
        });
    }
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body; 

    try {
        const isUserPresent = await User.findOne({ email });

        if (isUserPresent) {
            return res.status(400).json({
                "Message": "User already present please login"
            });
        } 
        const hashedPassword = await bcrypt.hash(password, 15);
        const newData = generateInitialData();
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            joinedOn: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            history: [newData]
        });
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        newUser.refreshToken = refreshToken;

        await newUser.save();

        const today = newUser.history.at(-1);
        const avg = getThreeMonthAverages(newUser.history);

        const clusterResponse = await axios.post('http://127.0.0.1:5000/api/predict',{
            "Heart_Rate": today.heartRate,
            "Blood_Oxygen_Level": today.bloodOxygen,
            "Sleep_Duration": today.sleepHours,
            "Steps": today.steps,
            "Calories_Burned": today.calories,
            "Distance_Covered": today.distance
        });

        const Cluster = clusterResponse.data.predicted_cluster;
        newUser.cluster = Cluster;
        await newUser.save();

        res.cookie("AccessToken", accessToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 3600 * 1000

        });

        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            "Messsage": "Sign Up Successful",
            "Name": newUser.name,
            "Email": newUser.email,
            "Cluster" : newUser.cluster,
            threeMonthAvg: avg,
            today,

        });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({
            "Message": "Internal Server Error"
        });
    }
}

const logout = async (req, res) => {
    res.clearCookie('AccessToken',{
        httpOnly: true,
        sameSite: "Strict",
    });

    res.clearCookie('RefreshToken',{
        httpOnly: true,
        sameSite: "Strict",
    });

    return res.status(200).json({
        "Message" : "Logout Suucessful"
    });
}

const loginStatus = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 401,
          isLoggedIn: false,
          message: "User not authenticated",
        });
      }
  
      const { name, picture } = req.user;
      return res.status(200).json({
        status: 200,
        isLoggedIn: true,
        user: {
          name: name || '',
          photo: picture || null,
        },
        message: "Status: Logged in Successfully",
      });
    } 
    catch (error) {
      console.error("Login status error:", error);
      return res.status(500).json({
        status: 500,
        isLoggedIn: false,
        message: "Internal server error",
      });
    }
  };
  
const refreshTokenGenerator = async (req, res) => {
    const token = req.cookies.RefreshToken;

    if (!token){
        return res.sendStatus(401);
    } 
  
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findOne({ email: decoded.email });

      if (!user || user.refreshToken !== token) return res.sendStatus(403);
  
      const newAccessToken = generateAccessToken(user);
      res.cookie("AccessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000
      });
  
      res.status(200).json({ message: "Token refreshed" });
    } catch (err) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  };
  
module.exports = {login, signUp, logout, loginStatus, refreshTokenGenerator}