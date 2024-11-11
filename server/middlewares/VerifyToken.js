const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = decoded.id; // Attach user ID to request for further use
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
