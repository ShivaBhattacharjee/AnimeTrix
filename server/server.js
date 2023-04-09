const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const singleChatRoutes = require("./routes/singleChatRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const groupChatRoutes = require("./routes/groupChatRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
connectDB();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/singleChat", singleChatRoutes);
app.use("/api/v1/groupChat", groupChatRoutes);
app.use("/api/v1/discussion", discussionRoutes);

app.all("*", (req, res) => {
    res.status(500).json({error: "Invalid request"});
})


app.listen(PORT ,()=>{
    console.log("Server created");
});