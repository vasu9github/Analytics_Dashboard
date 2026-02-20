import jwt from 'jsonwebtoken';

export const protect = async ( req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AUTH HEADER:", req.headers.authorization);

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_URI);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(501).json({ message: "Internal server error" });
    }
}