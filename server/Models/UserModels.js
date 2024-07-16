const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//complier
const UserModel = mongoose.model(`User`,UserSchema);
module.exports=UserModel;