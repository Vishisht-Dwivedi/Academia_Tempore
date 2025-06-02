import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import "./registerModels.js";
import schema from "./graphql/schema.js";
dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ req, res }),
    })
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
});
