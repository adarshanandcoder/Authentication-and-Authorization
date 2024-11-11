const User = require("../models/User")

exports.getUser = async(req,res)=>{
    const userId = req.id;
    console.log(userId)
    console.log("Hello")
    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (error) {
        return res.status(404).json({message :"Something went wrong"})
    }
    if(!user){
        return res.status(404).json({message :"User not found"})
    }
    return res.status(200).json({message : user})
}