const GroupChat = require("../modal/groupChatModal");
const User = require("../modal/userModal");
const uploadMedia = require("../utils/upload");

const getGroupChats = async(req, res) => {
    try {
        const _id = req.params._id;
        const GroupChats = await GroupChat.find({"members": {"$in": [_id]}}).populate("members");
        if(GroupChats.length != 0) 
            res.status(200).json(GroupChats);
        else
            res.status(400).json({message: "No group conversation started"});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

const createGroup = async(req, res) => {
    try {
        const {name, admin, members, isPrivate} = req.body;
        const file = req.file;
        if(members.length < 3) {
            res.status(400).json({message: "Add atleast 2 members"})
        } else {
            if(isPrivate) {
                const newGroup = GroupChat.create({"name": name, "admin": admin, "members": [admin, ...members], "private": true});
                res.status(201).json(newGroup);
            } else {
                const newGroup = GroupChat.create({"name": name, "admin": admin, "members": [admin, ...members]});
                res.status(201).json({message: "Group Created"});
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getMessages = async(req, res) => {
    try {
        const {_id, sender} = req.params; 
        const chats = await GroupChat.findById(_id).populate("messages.sender");
        if(chats) {
            if(!chats.members.includes(sender)) 
                return res.status(400).json({message: "Not a valid user"});
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
    } else {
        res.status(400).json({message: "Group doesnt exists"});
    }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const storeMessages = async(req, res) => {
    try {
        const {_id, sender, message} = req.body;
        const file = req.file;
        const chat = await GroupChat.findOne({"_id": _id});
        if(chat) {
            if(!chat.members.includes(sender)) {
                res.status(400).json({message: "Not a member"});
            } else {
                let path;
                if(file) {
                    path = await uploadMedia(file.buffer, chat._id+Date.now(), "profile-pics");
                }
                const newMessage = path ? {"sender": sender, "message": message, "media": path}:{"sender": sender, "message": message};
                chat.messages.push(newMessage);
                await chat.save();
                res.status(201).json(newMessage);
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changeAdmin = async(req, res) => {
    try {
        const {sender, newAdmin, _id} = req.body;
        const chat = await GroupChat.findById(_id);
        if(chat) {
            if(sender != chat.admin) {
                res.status(400).json({message: "Only admin can change admin"});
            } else {
                if(!chat.members.includes(newAdmin)) {
                    res.status(400).json({message: "Only member can be admin"});
                }
                else {
                    chat.admin = newAdmin;
                    await chat.save();
                    res.status(201).json(chat);
                }
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addMember = async(req, res) => {
    try {
        const {sender, newMember, _id} = req.body;
        const chat = await GroupChat.findById(_id);
        if(chat) {
            if(sender != chat.admin && chat.private) {
                res.status(400).json({message: "Only admin can add member"});
            } else {
                if(chat.members.includes(newMember)) {
                res.status(400).json({message: "Already a member"});
                } else {
                    chat.members.push(newMember);
                    await chat.save();
                    res.status(201).json(chat);
                }
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteMember = async(req, res) => {
    try {
        const {member, _id} = req.params;
        let chat = await GroupChat.findById(_id);
        if(chat) {
            if(chat.members.includes(member)) {
                await GroupChat.updateOne({"_id": _id}, {"$pull": {"members": member}});
                if(chat.admin == member) {
                    chat = await GroupChat.findById(_id);
                    chat.admin = chat.members[0];
                    await chat.save();    
                    res.status(201).json(chat);
                } else {
                    chat = await GroupChat.findById(_id);
                    res.status(201).json(chat);
                }
            } else {
                res.status(400).json({message: "Member is not a part of group"});
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changeGroupName = async(req, res) => {
    try {
        const {sender, newName, _id} = req.body;
        const chat = await GroupChat.findById(_id);
        if(chat) {
            if(sender != chat.admin) {
                res.status(400).json({message: "Only admin can change group name"});
            } else {
                    chat.name = newName;
                    await chat.save();
                    res.status(201).json(chat);
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changeVisibilty = async(req, res) => {
    try {
        const {sender, _id} = req.body;
        const chat = await GroupChat.findById(_id);
        if(chat) {
            if(sender != chat.admin) {
                res.status(400).json({message: "Only admin can change group visibilty"});
            } else {
                    chat.private = !chat.private;
                    await chat.save();
                    res.status(201).json(chat);
            }
        } else {
            res.status(400).json({message: "Group doesnt exists"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllGroupChats = async(req, res) => {
    try {
        const chats = await GroupChat.find({"private": false}).populate("members");
        res.status(200).json(chats);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addProfilePic = async(req, res) => {
  try {
    const {_id} = req.body;
    const file = req.file;
    if(!file)
      return res.status(400).json({message: "Add file"})
    const groupChat = await GroupChat.findById(_id);
    if(groupChat) {
      const path = await uploadMedia(file.buffer, groupChat._id+Date.now(), "profile-pics");
      groupChat.profilePicture = path;
      await groupChat.save();
      res.status(200).json({url: path});
    } else {
      res.status(400).json({message: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  } 
}


module.exports = {
    getGroupChats, 
    getMessages, 
    createGroup, 
    storeMessages, 
    changeAdmin, 
    addMember, 
    deleteMember,
    getAllGroupChats, 
    changeGroupName, 
    changeVisibilty,
    addProfilePic
};