import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

router.post("/createuser", async (req, res) => {
    const { name, email, password: pwd } = req.body;
    if (!name || !email || !pwd) return res.status(400).json({ message: "Name, email and password are required." });
    try {
        const duplicate = await User.findOne({ email }).exec();
        if (duplicate) return res.status(409).json({ message: "This email is already registered" });
        const hashedPwd = await bcrypt.hash(pwd, 12);
        const user = await User.create({ ...req.body, password: hashedPwd });
        const data = {
            user: {
                id: user._id,
            },
        };
        const authtoken = jwt.sign(data, "JWT_SECRET");
        res.status(201).json({ success: `New user ${name} created!`, authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password: pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ message: "Email and password are required." });
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(401).json({ error: "Please try to login with correct credentials" });
        const passwordCompare = await bcrypt.compare(pwd, user.password);
        if (!passwordCompare) return res.status(401).json({ error: "Please try to login with correct credentials" });
        const data = {
            user: {
                id: user._id,
            },
        };
        const authtoken = jwt.sign(data, "JWT_SECRET");
        res.status(200).json({ authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password").exec();
        res.status(200).send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// export { router };
export default router;
