import jwt from "jsonwebtoken";
const JWT_SECRET = "ssr344@lkkk";

const authenticate = async (req, res) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const token = header.split(" ")[1];
    console.log("before decoded", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("after decode");
    req.user = decoded;
    console.log(decoded);
  } catch (error) {
    return res.json({ error: "Invalid token" });
  }
};

export default authenticate;
