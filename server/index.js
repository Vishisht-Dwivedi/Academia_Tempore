import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import schema from "./graphql/schema.js";
import "./registerModels.js";
import next from "next";
import { parse } from "url";
import compression from "compression";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/academia-tempore";
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev, dir: "." });
const handle = nextApp.getRequestHandler();

const app = express();

try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
} catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
}
app.use(compression());
// Apollo GraphQL setup
const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ req, res }),
    })
);

// Prepare Next.js
await nextApp.prepare();

// Catch-all route (must come after prepare)
app.use((req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Monolith running at http://localhost:${PORT}`);
});
