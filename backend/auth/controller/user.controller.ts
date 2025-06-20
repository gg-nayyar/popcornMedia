import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userModel from '../models/userSchema.model';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response):Promise<void> => {
    const { email, password, name } = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            email,
            password: hashedPassword,
            name,
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const login = async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getProfile = async (req: Request, res: Response):Promise<void> => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        const userId = typeof decoded === "object" && "id" in decoded ? (decoded as { id: string }).id : null;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export default {
    register,
    login,
    getProfile
};