const express= require("express");
const { getSingleChats, getMessages, storeMessages, getAllSingleChats } = require("../controllers/singleChatController");

const routes = express.Router();

//_id
routes.get("/getChat/:_id", getSingleChats);

//_id sender
routes.get("/message/:_id/:sender", getMessages);

//sender reciever message
routes.post("/message", storeMessages);

routes.get("/allChats", getAllSingleChats);

module.exports = routes;