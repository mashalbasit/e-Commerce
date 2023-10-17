import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true, required: true },
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    confirmPassword: {type: String},
    isAdmin: {type: Boolean, required:true},
    profilePicture: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    address:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    resetToken: {type: String},
    resetTokenExpiration: {type: Date}
})

const schema = mongoose.model("User", userSchema)
export default schema