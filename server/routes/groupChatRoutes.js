const express= require("express");
const { getGroupChats, getMessages, createGroup, storeMessages, changeAdmin, addMember, deleteMember, getAllGroupChats, changeGroupName, changeVisibilty, addProfilePic} = require("../controllers/groupChatController");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({storage});

const routes = express.Router();

//_id deni hat
routes.get("/getChat/:_id", getGroupChats);

//name admin members isPrivate
routes.post("/create/chat", createGroup);

//_id sender
routes.get("/message/:_id/:sender", getMessages);

//_id sender message
routes.post("/message", storeMessages);

// sender newAdmin _id
routes.post("/change/admin", changeAdmin);

// sender newMember _id
routes.post("/member", addMember);

// member _id
routes.delete("/delete/member/:_id/:member", deleteMember);

// sender newName _id
routes.post("/change/name", changeGroupName);

//sender _id
routes.post("/change/visibilty", changeVisibilty);

routes.get("/allChats", getAllGroupChats);

// _id file 
routes.post("/add/profile-pic", upload.single("file"), addProfilePic);

module.exports = routes;