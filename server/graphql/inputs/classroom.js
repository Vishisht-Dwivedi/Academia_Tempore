import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const ClassroomInputType = new GraphQLInputObjectType({
    name: "ClassroomInput",
    fields: {
        room: { type: new GraphQLNonNull(GraphQLString) }
    }
});
