import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import Route from './routes/index.js';

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// All routes
app.use('/api/v1',Route);

const port = process.env.PORT || 8000;
app.listen(8000, (err) => {
    if (!err) {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Successfully connected"))
            .catch(err => console.error('MongoDB connection error:', err));
        console.log(`Example app listening on port ${port}`);
    }
})