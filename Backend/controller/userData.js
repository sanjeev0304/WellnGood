const express = require('express');

const User = require('../model/User');
const getThreeMonthAverages = require('../utils/getThreeMonthAverages');
const userData = async (req, res) => {
    //fetch data with user id from DB
    try {
    const uid = req.user.uid;
    const user = await User.findOne({uid});
        if(!user){
            res.status(404).json({"Message":"User Not Found"});
        }
        const today = user.history.at(-1);
        const avg = getThreeMonthAverages(user.history);
        res.status(200).json({
            today,
            avg,
            "Name" : user.name,
            "Email" : user.email
    });

    } catch (error) {
        res.status(500).json({"Message":"Internal Server Error"});
    }
}
module.exports = userData;