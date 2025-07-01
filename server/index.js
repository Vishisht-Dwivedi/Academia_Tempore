import express, { urlencoded } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import compression from "compression";
import next from "next";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import schema from "./graphql/schema.js";
import "./registerModels.js";
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
            context: async ({ req, res }) => ({ req, res }),
        })
    );

    // Reserved route — NOT handled by Next.js
    server.post("/login", async (req, res) => {
        console.log("Login route hit", req.body);
        const hashedPass = await bcrypt.hash(req.body.password, 12);
        console.log(hashedPass);
        res.redirect("/dashboard");
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
