import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import compression from "compression";
import cookie from "cookie";
import next from "next";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import schema from "./graphql/schema.js";
import "./registerModels.js";
import { adminController } from "./controllers/admin.js";
import { teacherController } from "./controllers/teacher.js";
import readPayload from "./services/auth/readPayload.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/academia-tempore";
const dev = process.env.NODE_ENV !== "production";

// Next.js app
const nextApp = next({ dev, dir: "." });
const handle = nextApp.getRequestHandler();

// Main start function
nextApp.prepare().then(async () => {
    const server = express();

    // Connect MongoDB
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }

    // Apollo Server setup
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    server.use(compression());
    server.use(express.json());
    server.use(urlencoded({ extended: true }));
    server.use(
        "/graphql",
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => {
                const cookies = req.headers.cookie
                    ? cookie.parse(req.headers.cookie)
                    : {};
                const token = cookies.user;

                if (!token) {
                    res.writeHead(302, { Location: "/" });
                    res.end();
                    return {};
                }

                try {
                    const user = readPayload(token);
                    if (!user) throw new Error("Invalid token");

                    return { req, res, user };
                } catch (err) {
                    console.warn("Invalid or expired token:", err.message);
                    res.writeHead(302, { Location: "/" });
                    res.end();
                    return {};
                }
            },
        })
    );
    // Reserved route — NOT handled by Next.js
    server.post("/login/admin", adminController);
    server.post("/login/teacher", teacherController);
    server.get("/api/me", (req, res) => {
        const cookiesHeader = req.headers.cookie;
        if (!cookiesHeader) {
            return res.status(401).json({ user: null, message: "No cookie found" });
        }

        const cookies = cookie.parse(cookiesHeader);
        const token = cookies.user;

        if (!token) {
            return res.status(401).json({ user: null, message: "Token not found" });
        }

        try {
            const user = readPayload(token); // Safely verifies JWT
            if (!user) throw new Error("Invalid payload");

            // You can customize what to send back here
            return res.status(200).json({
                user: {
                    name: user.user,
                    email: user.email,
                    role: user.authScope
                },
            });
        } catch (err) {
            console.warn("Failed to decode token in /api/me:", err.message);
            return res.status(403).json({ user: null, message: "Invalid or expired token" });
        }
    });

    // Catch-all — handled by Next.js
    server.use((req, res) => {
        return handle(req, res);
    });

    // Start server
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`GraphQL at http://localhost:${PORT}/graphql`);
    });
});
