const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(`🛡️ JWT Verification Failed: ${err.message}`);
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
    console.log("🔓 JWT Verified successfully");
    req.adminId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
