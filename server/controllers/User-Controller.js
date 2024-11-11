const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        return res.status(201).json({ message: user });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // Check if password is correct
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.logout = async(req,res)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error , user) =>{
        if(error){
            return res.status(400).json({message:"Invalid Token"});
        }
        res.clearCookie(String(user.id));
        return res.status(200).json({message : "Successfully logged out"})
    })
}