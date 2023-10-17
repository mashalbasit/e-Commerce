import User from "../Model/userModel.js";
import bcrypt from "bcrypt"

//User Registrations
export const registerUser = async (req, res) => {
    try {
        console.log("controller.....")
        const {userName, email, password, confirmPassword, isAdmin, profilePicture, phoneNumber, address, firstName, lastName} = req.body;

         if (!userName || !email || !password || !confirmPassword || !isAdmin || !profilePicture || !phoneNumber || !address || !firstName || !lastName){
            return res.status(400).send("All fields are required")
         }
        
         const userExists = await User.findOne({userName})
         const emailExists = await User.findOne({email})

         if (userExists){
            return res.status(409).json({message:"Username already exists"})
         }
         if (emailExists){
            return res.status(409).json({message: "Email already registered"})
         }
         if (password !== confirmPassword){
            return res.status(409).json({message:"Password not matched"})
         } else {

            const encryptPassword = await bcrypt.hash(password, 4)
            const newUser =new User({userName, email, password:encryptPassword, isAdmin, profilePicture, phoneNumber, address, firstName, lastName})

            await newUser.save();
            res.status(201).json(newUser);
         }
       

    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

//User Login
export const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user){
            return res.status(401).json({message:"Email or password incorrect"})
        }

        const passwordVerified = await bcrypt.compare(password, user.password)

        if(!passwordVerified){
            return res.status(401).json({message:"Email or password incorrect"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//Get all user record
export const getAllUser = async(req, res) => {
    try {
        let page = req.query.page
        let pageLimit = req.query.pageLimit

        const users = await User.find()
        .skip((page - 1) * pageLimit )
        .limit(pageLimit)

        if (users){
            res.status(200).json(users)
        }

    } catch (error){
        res.status(500).json({message: error.message})
    }
};

//Get single user record
export const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params

        const user = await User.findById(id)

        if (user){
            res.status(200).json(user)
        }
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

//Update single user record
export const updateSingleUser = async (req, res) => {
    try {
        const {id} = req.params

        const user = await User.findByIdAndUpdate(id, req.body, {new:true})

        if (user) {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Delete single user record
export const deleteSingleUser = async (req, res) => {
    try {
        const {id} = req.params

        const user = await User.findByIdAndDelete(id)

        if (user) {
            res.status(200).json({message:"User Succesfully Deleted"})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Reset Password
export const updatePassword = async(req, res) => {
    try{
        const{email, oldPassword, newPassword} = req.body
        const user = await User.findOne({email})
        const passwordValid =await bcrypt.compare(oldPassword, user.password)

        if(!user){
            return res.status(404).json({message: "Invalid User"})
        }

        if(passwordValid){
            user.password = await bcrypt.hash(newPassword, 4)
            await user.save()
        } else {
            res.status(404).json({message: "Password does not match"})
        }

        res.status(200).json({message:"Password Successfully Reset"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}