import axios from 'axios';
import jwt from 'jsonwebtoken';
import express from 'express';

const app = express();

app.use(express.json());

app.post('/location', async (req, res): Promise<void> => {
    const { state, city } = req.body;
    if (!state || !city) {
        res.status(400).json({ error: 'State and city are required' });
        return;
    }
    try {
        const locationCookie = jwt.sign(
            { state, city },
            process.env.JWT_SECRET || '',
            { expiresIn: '24h' }
        );
        res.cookie('location', locationCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'Location cookie set successfully' });
    }
    catch (error) {
        console.error('Error setting location cookie:', error)
        res.status(500).json({ error: 'Failed to set location cookie' })
        return
        };
});

export default app;