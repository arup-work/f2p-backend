import User from "../entities/User.js"
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from "../utils/mailer.js";
import emailQueue from "../utils/emailQueue.js";


// A function to check if an email exists in your database
const emailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
}

// Get user details 
const userDetails = async(email) => {
    return await User.findOne({ email });
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
            user: { name: user.name, email: user.email }
        }
    }

    static async login(email, password) {
        // Check if the email is exit or not
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credential");
        }

        //  check the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid credential");
        }

        // Sign a JWT token
        const token = JWT.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        return {
            token,
            user: { name: user.name, email: user.email }
        }

    }

    static async forgetPassword(email) {
        // Check if the email is already in use
        const user = await userDetails(email);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set token and expiry on user
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = Date.now() + 360000; //1hr
        await user.save();

        // Send email with the reset token
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const context = { resetURL, name: user.name };
        await emailQueue.add({
            email,
            subject: 'Password Reset',
            template: 'resetPasswordTemplate.ejs',
            context
        });

        return true;


    }
}