const express = require('express');

const User = require('../model/User');

const generateInitialData = require('../utils/generateInitialData');
const generateNextDayData = require('../utils/generateNextDayData');
const getThreeMonthAverages = require('../utils/getThreeMonthAverages');

const googleLogin = async (req, res) => {
    const { uid, name, email, accessToken, refreshToken } = req.body;

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            const newData = generateInitialData();
            user = new User({
                uid,
                email,
                name,
                joinedOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                history: [newData]
            });

            await user.save();
        }
        else {
            const current = new Date();
            const last = new Date(user.lastUpdated);
            let diff = current - last;
            if (diff > 24 * 60 * 60 * 1000) {
                const updatedData = generateNextDayData(user.history.at(-1)) //returns the most recent data
                user.history.push(updatedData);
                user.lastUpdated = current.toISOString();
                await user.save();
            }

        }

        const today = user.history.at(-1);
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