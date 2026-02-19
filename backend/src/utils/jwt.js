import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },                 
    process.env.SECRET_URI,      
    { expiresIn: "1d" }
  );
};
