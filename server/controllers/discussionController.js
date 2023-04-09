const Discussions = require("../modal/discussionModal");

//Retrieve all the comments of a particular episode
const getComments = async(req, res) => {
    try {
        const _id = req.params._id;    
        const discussion = await Discussions.findById(_id).populate("comments.sender");
        if(discussion) {
            res.status(200).json(discussion);
        }
        else
            res.status(200).send("");
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const storeComments = async(req, res) => {
    try {
        const {sender, comment, _id} = req.body;

        const discussion = await Discussions.findById(_id);
        const newComment = {"sender": sender, "comment": comment};
        if(discussion) {
            discussion.comments.push(newComment);
            await discussion.save();
            res.status(201).json(discussion.comments);
        } else {
            const newDiscussion = await Discussions.create({"_id": _id, comments:[newComment]});
            res.status(201).json(newDiscussion.comments);
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const like = async(req, res) => {
    try {
        const {sender , _id, _comId} = req.body;

        const discussion = await Discussions.findById(_id);
        console.log(discussion);
        if(discussion) {
            const reqDis = await Discussions.findOne({ _id: _id, "comments._id": _comId, "comments.likes": {"$in": [sender]} });
            if(reqDis) {
                await Discussion.updateOne({ _id: _id, "comments._id": commentIdToUpdate },{ $pull: { "comments.$.likes": userIdToRemove } })
            }
        } else {
            res.status(400).json({message: "No comments posted"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const disLike = async(req, res) => {
    try {
        const {sender , _id} = req.body;

        const discussion = await Discussions.findById(_id);
        if(discussion) {
            if(!discussion.comments.disLikes.includes(sender)) {
                discussion.comments.disLikes.push(sender);
                await discussion.save();
                res.status(201).json({message: "DisLiked comment"});
            } else {
                discussion.comments.disLikes.pull(sender);
                await discussion.save();
                res.status(201).json({message: "removed DisLiked comment"});   
            }
        } else {
            res.status(400).json({message: "No comments posted"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {getComments, storeComments, like, disLike};