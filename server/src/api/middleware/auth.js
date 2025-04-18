import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
}

export default authMiddleware;