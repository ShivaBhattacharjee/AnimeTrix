const express = require("express");
const {addUser, loginUser, getAllUser, getUser, addProfilePic, verify, changePassword} = require("../controllers/userController");
const validateEmail = require("../middleware");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({storage});

const route = express.Router();

route.post("/register", validateEmail, addUser);
route.post("/login", validateEmail, loginUser);
route.post("/verify", verify);
route.post("/change/password", changePassword);


module.exports = route;