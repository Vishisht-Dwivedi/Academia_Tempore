import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} from "graphql";

export const SlotInputType = new GraphQLInputObjectType({
    name: "SlotInput",
    fields: {
        slot: { type: new GraphQLNonNull(GraphQLInt) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        room: { type: new GraphQLNonNull(GraphQLString) },
        teacher: { type: new GraphQLNonNull(GraphQLString) }
    }
});
