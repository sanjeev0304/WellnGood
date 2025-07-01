const express = require('express');

const User = require('../model/User');
const getThreeMonthAverages = require('../utils/getThreeMonthAverages');
const userData = async (req, res) => {

    try {
        const email = req.user.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ "Message": "User Not Found" });
        }
        const today = user.history.at(-1);
        const avg = getThreeMonthAverages(user.history);
        return res.status(200).json({
            today,
            avg,
            "History": user.history,
            "Name": user.name,
            "Email": user.email
        });

    } catch (error) {
        return res.status(500).json({ "Message": "Internal Server Error" });
    }
}
module.exports = userData;