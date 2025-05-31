import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import "./registerModels.js";

dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to Database");
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}

// TypeDefs and resolvers
const typeDefs = `#graphql
    type Teacher {
        name: String
        code: String
        subjects: [String]
        classes: [String]
        schedule: [String]
    }

    type Query {
        getTeachers: [Teacher]
    }
`;

const resolvers = {
    Query: {
        getTeachers: () => {
            return [
                {
                    name: "John",
                    code: "T01",
                    subjects: ["Math"],
                    classes: ["10A"],
                    schedule: ["Mon 9AM"],
                },
            ];
        },
    },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
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
