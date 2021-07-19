const { Schema, model } = require("mongoose"), bcrypt = require("bcrypt"), mongoose = require("mongoose");

//no se mete dentro de un objeto transaction, por la misma razón que userschema no se mete dentro de un objeto user
const TransactionSchema = new Schema({
    concept: {
        type: String, 
        required: true
    },
    action: String,
    cuantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UserSchema = new Schema({
    email: {
        type: String, 
        required: "The email is required",
        unique: "This user already exists",
        trim: true
    },
    username: {
        type: String, 
        unique: "This user already exists",
        trim: true
    },
    password: String,
    profilePic: String,
    budget: Number,
    transactions: [TransactionSchema]
}, {
    timestamps: true, 
    versionKey: false
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema)

module.exports = User