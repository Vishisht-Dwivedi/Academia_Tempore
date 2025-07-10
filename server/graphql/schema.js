import { GraphQLSchema } from "graphql";
import { Query } from "./queries/index.js";
import { Mutation } from "./mutations/index.js";

// Unified GraphQL Schema
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;
