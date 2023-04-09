const SingleChat = require("../modal/singleChatModal");
const User = require("../modal/userModal");


//Retrieve all the chats that user has participated
const getSingleChats = async(req, res) => {
    try {
        const _id = req.params._id;
        const singleChats = await SingleChat.find({"members": {"$in": [_id]}}, {"_id": 1, "messages": 1}).populate("members");
        if(singleChats.length != 0) 
            res.status(200).json(singleChats);
        else
            res.status(400).json({message: "No conversation started"});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//Retrieve all the messages of a particular discussion
const getMessages = async(req, res) => {
    try {
        const _id = req.params._id;  
        const sender = req.params.sender;  
        const chats = await SingleChat.findById(_id).populate("messages.sender");
        if(!chats.members.includes(sender)) 
            res.status(400).json({message: "Not a valid user"});
        if(chats.length != 0) {
            let seenUpdated = false;
            chats.messages.forEach(message => {
            if (message.sender._id.toString() !== sender && !message.seen.includes(sender)) {
                message.seen.push(sender);
                seenUpdated = true;
            }
        });
            if (seenUpdated) 
                await chats.save();
            res.status(200).json(chats);
        }
        else
            res.status(400).json({message: "No message sent"});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const storeMessages = async(req, res) => {
    try {
        const {sender, receiver, message} = req.body;

        const chat = await SingleChat.findOne({"members":  {"$all" : [sender, receiver]}});
        const newMessage = {"sender": sender, "message": message};
        if(chat) {
            chat.messages.push(newMessage);
            await chat.save();
            res.status(201).json(newMessage);
        } else {
            const senderData = await User.find({"_id": sender});
            const receiverData = await User.find({"_id": receiver});

            if(senderData.length == 0 || receiverData.length == 0)
                res.status(400).json({"message": "User doesnt exists"});
            else {
                const newChat = await SingleChat.create({"members":[sender, receiver], "messages": [newMessage]});
                res.status(201).json(newMessage);
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllSingleChats = async(req, res) => {
    const chats = await SingleChat.find({}).populate("members");
    res.status(200).json(chats);
}

module.exports = {getSingleChats, getMessages, storeMessages, getAllSingleChats};