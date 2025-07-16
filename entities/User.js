import mongoose from "mongoose";

// Define a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

// Create a model
const User = mongoose.model(userSchema);

// Export the model
export default User;