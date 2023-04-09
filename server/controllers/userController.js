const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadMedia = require("../utils/upload");
const sendVerificationEmail = require("../utils/email");

const addUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

      // Check if user already exists
      const user = await User.findOne({"email": email});
      if (user && user.isVerified == true) {
        return res.status(400).json({ error: 'User already exists' });
      }
      if(!user) {
        // Hash the password and store the user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        await User.create({ name, email, password: hashedPassword, verificationCode: verificationCode });
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: `Verification code send to ${email}` });
      } else {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await bcrypt.hash(password, 10);

        user.verificationCode = verificationCode;
        user.name = name;
        user.password = hashedPassword;

        await user.save();
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: `Verification code send to ${email}` });
      }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const verify = async(req, res) => {
  try {
    const {email, verificationCode} = req.body;
    const user = await User.findOne({ "email": email });
      if (!user) {
          return res.status(401).json({ error: 'User Doesnt exist' });
      }
      console.log(user.v)
    if(user.verificationCode == verificationCode) {
      user.isVerified = true;
      await user.save();
      res.status(200).json({message: "Verification Successfull"});
    } else {
      res.status(400).json({error: "Invalid OTP"});
    }
    
  } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body;

      // Find the user in the database
        const user = await User.findOne({ "email": email, isVerified: true });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

      // Check if the password matches the hashed password in the database
        const passwordMatches = await bcrypt.compare(password, user.password);
        console.log(passwordMatches);
        console.log(user);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

      // Create a JWT token and send it to the client
        const token = jwt.sign({ email }, '<secret_key>');
         //res.json({ token });
        res.json(user);

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllUser = async(req, res) => {
    try {
        const users = await User.find({isVerified: true},{_id: 1, name: 1, profilePicture: 1, email: 1});
        res.status(200).send(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUser = async(req, res) => {
  try {
    const {_id } = req.params;
    const users = await User.find({"_id": _id, isVerified: true},{_id: 1, name: 1});
    res.status(200).send(users);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const changePassword = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = User.findOne({"email": email, isVerified: true});
    if(user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      await User.updateOne({"email": email}, {"$set": {"password": hashedPassword, "isVerified": false, "verificationCode": verificationCode}});
      await sendVerificationEmail(email, verificationCode);

      res.status(201).json({ message: `Verification code send to ${email}` });
    } else {
      res.status(400).json({error: "User Doesnt exists"});
    }
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
      return res.status(400).json({error: "Add file"})
    const user = await User.find({"_id": _id, isVerified: true});
    if(user) {
      const path = await uploadMedia(file.buffer, user.email+Date.now(), "profile-pics");
      user.profilePicture = path;
      await user.save();
      res.status(200).json({url: path});
    } else {
      res.status(400).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

const changeName = async(req, res) => {
  try {
    const {_id, name} = req.body;
    const user = User.find({"_id": _id, isVerified: true})
    if(user) {
      await User.updateOne({"_id": _id}, {"$set": {"name": name}});
      res.status(200).json({message: "Password Updated"});
    } else {
      res.status(400).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
} 

module.exports = {addUser, loginUser, getAllUser, getUser, addProfilePic, changePassword, changeName, verify};