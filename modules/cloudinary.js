const cloudinary = require('cloudinary').v2;

const cloud = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "daw55r4bp",
    api_key: process.env.API_KEY || 635227981815998,
    api_secret: process.env.SECRET_KEY || "XEqM8bUKSH2Z1Ype01w8ROlUJQk"
})

module.exports = cloudinary;