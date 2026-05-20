import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env["JWT_SECRET"];

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res
      .status(401)
      .json({ error: "You are not authenticated: Token missing" });
  }

  try {
    const token = header.split(" ")[1];
    console.log("before decoded", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.json({ error: "Invalid token" });
  }
};

export default authenticate;
