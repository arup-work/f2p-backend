import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(8000, (err) => {
    if (!err) {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Successfully connected"))
            .catch(err => console.error('MongoDB connection error:', err));
        console.log(`Example app listening on port ${port}`);
    }
})