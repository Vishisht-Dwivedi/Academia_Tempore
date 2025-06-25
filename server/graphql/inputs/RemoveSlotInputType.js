import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from "graphql";

export const RemoveSlotInputType = new GraphQLInputObjectType({
    name: "RemoveSlotInput",
    fields: {
        room: { type: new GraphQLNonNull(GraphQLString) },
        day: { type: new GraphQLNonNull(GraphQLString) },
        slot: { type: new GraphQLNonNull(GraphQLInt) }
    }
});
