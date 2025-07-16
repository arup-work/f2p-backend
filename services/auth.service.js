import User from "../entities/User.js"
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


// A function to check if an email exists in your database
const emailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
}

export default class AuthService {
    static async register(name, email, password) {
        // Check if the email is already in use
        const emailAlreadyExist = await emailExists(email);
        if (emailAlreadyExist) {
            throw new Error('Email is already taken');
        }

        // hash the password
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // Proceed with user registration since email is unique and validation passed
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })


        return {
            user: { name: user.name, email: user.email}
        }
    }
}