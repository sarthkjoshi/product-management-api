import jwt from "jsonwebtoken";
const JWT_SECRET = "ssr344@lkkk";

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const token = header.split(" ")[1];
    console.log("before decoded", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("Decoded successfully now going to next()", decoded);
    next();
  } catch (error) {
    return res.json({ error: "Invalid token" });
  }
};

export default authenticate;
