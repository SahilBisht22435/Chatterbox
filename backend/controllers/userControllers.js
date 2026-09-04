    const asyncHandler = require('express-async-handler');
    const User = require('../models/userModel');
    const generateToken = require('../config/generateToken');

    const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password, pic } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please enter all the fields");
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            pic,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Failed to create the user");
        }
    });

    const authUser = asyncHandler(async(req,res)=>{
        const { email, password} =req.body;

        const user = await User.findOne({ email });
        
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            })
        }else{
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    });
        // for seacrhing query or user
        // console.log(keyword);
    const allUsers =asyncHandler(async (req, res)=>{
        const keyword = req.query.search?{
            $or: [
                { name: { $regex: req.query.search, $options:"i"}},
                { email: { $regex: req.query.search, $options:"i"}},//searhing whether name matches inside email or name using regex with i means incasesensitive
            ]
        }
        :{};


        const users= await User.find(keyword)//.find({_id: {$ne: req.user._id}})to get current id of user which is login
        res.json(users);
    });

    module.exports = { registerUser, authUser, allUsers};//export
