import jwt from "jsonwebtoken";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) res.status(401).send({ error: "Please authenticate using a valid token" });
    try {
        jwt.verify(token, "JWT_SECRET", (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.user;
            next();
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};

export default fetchuser;
