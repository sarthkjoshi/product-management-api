import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env["JWT_SECRET"];

export const resgisterUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      registeredUser: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!foundUser) {
      return res.status(400).json({ error: "Invalid credentials used" });
    }

    const isValid = await bcrypt.compare(password, foundUser.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: foundUser.userId,
        name: foundUser.name,
        userRole: foundUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    return res.json({ token: `Bearer ${token}` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Token generation failed from server" });
  }
};
