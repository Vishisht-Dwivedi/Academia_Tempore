import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLError, GraphQLInt } from "graphql";

export const DaySlotInput = new GraphQLInputObjectType({
    name: "DaySlotInput",
    fields: () => ({
        slot: { type: new GraphQLNonNull(GraphQLInt) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        room: { type: new GraphQLNonNull(GraphQLString) },
        teacher: { type: new GraphQLNonNull(GraphQLString) }
    })
});