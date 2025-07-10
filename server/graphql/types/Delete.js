import { GraphQLObjectType, GraphQLString } from "graphql";

export const DeleteResultType = new GraphQLObjectType({
    name: "DeleteResult",
    fields: () => ({
        success: { type: GraphQLString },
        message: { type: GraphQLString },
    }),
});