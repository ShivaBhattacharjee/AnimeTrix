const express= require("express");
const { getComments, storeComments, like, disLike } = require("../controllers/discussionController");

const routes = express.Router();

//_id
routes.get("/comments/:_id", getComments);

//sender reciever message
routes.post("/comment", storeComments);

routes.post("/like", like);

routes.post("/dislike", disLike);

module.exports = routes;