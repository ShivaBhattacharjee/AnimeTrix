const cloudinary = require('cloudinary').v2;
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dqmdbfgcx",
  api_key: process.env.API_KEY || "766926152337892",
  api_secret: process.env.API_SECRET || "sQ9L85mp0ttZElmUWSXTjOc40c4"
});

const uploadMedia = async(file, fileName, path) => {
    try {
    if(file && fileName && path) {
        let t;
        const result = await cloudinary.uploader.upload(file, { 
            folder: path, 
            public_id: fileName
        })
        return result.secure_url;
    } 
} catch(err) {
    console.log(err)
}
}

module.exports = uploadMedia;