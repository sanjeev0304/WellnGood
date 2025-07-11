const express = require('express');

const User = require('../model/User');
const axios = require('axios');
const generateInitialData = require('../utils/generateInitialData');
const generateNextDayData = require('../utils/generateNextDayData');
const getThreeMonthAverages = require('../utils/getThreeMonthAverages');

const googleLogin = async (req, res) => {
    const { uid, name, email, photoURL, accessToken, refreshToken } = req.body;

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            const newData = generateInitialData();
            user = new User({
                uid,
                email,
                name,
                photoURL,
                joinedOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                history: [newData]
            });

            await user.save();
        }
        const today = user.history.at(-1);
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

            user.cluster = Cluster;
            await user.save();
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

        

   
        const avg = getThreeMonthAverages(user.history);

        res.cookie("AccessToken", accessToken,{
            httpOnly : true,
            sameSite: "Strict",
            maxAge: 3600 * 1000

        });

        res.cookie("RefreshToken", refreshToken, {
            httpOnly : true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(201).json({
            "Message" : "Login Sucessful",
            "Name" : user.name,
            "Email" : user.email,
            "Cluster" : user.cluster,
            threeMonthAvg : avg,
            today
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({"error" : "Something went wrong"});
    }
}

module.exports = googleLogin;