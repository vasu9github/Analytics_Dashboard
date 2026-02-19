import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import { generateToken } from '../utils/jwt.js'


export const register = async (req, res) => {
  try {
    const { username, email, password, age, gender } = req.body;

    if (!username || !email || !password || !age || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Minimum 6 characters required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        age,
        gender
      }
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user) {
            return res.status(404).json({ message: "User not found "})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user.id);

        res.status(201).json({
            message: "Login successfull",
            token,
            user : {
                id: user.id,
                username: user.username,
                age: user.age,
                gender: user.gender
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error)
    }
}