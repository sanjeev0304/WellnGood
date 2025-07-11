const mongoose = require("mongoose");

const HealthSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    default: 0
  },
  sleepHours: {
    type: Number,
    default: 0
  },
  heartRate: {
    type: Number,
    default: 0
  },
  calories: {
    type: Number,
    default: 0
  },
  bloodOxygen: {
    type: Number,
    default: 0
  },
  distance: {
    type: Number,
    default: 0
  }

}, { _id: false });


const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: null 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: null 
  },
  photoURL: {                  
    type: String,
    default: null
  },
  refreshToken: {
    type: String,
    default: null
  },
  cluster: {
    type: String,
    default: null
  },
  joinedOn: {
    type: String,
    default: () => new Date().toISOString()
  },
  lastUpdated: {
    type: String,
    default: () => new Date().toISOString()
  },
  history: {
    type: [HealthSchema],
    default: []
  }
});

module.exports = mongoose.model("User", UserSchema);
