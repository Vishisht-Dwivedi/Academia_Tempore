import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default function readPayload(payload) {
    return jwt.verify(payload, JWT_SECRET);
}