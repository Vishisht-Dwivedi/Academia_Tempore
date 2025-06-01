import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLInt } from "graphql";

const DaySlotType = new GraphQLObjectType({
    name: "DaySlot",
    fields: () => ({
        slot: { type: GraphQLInt },
        subject: { type: GraphQLString },
        type: { type: GraphQLString },
        room: { type: GraphQLString },
        teacher: { type: GraphQLString }
    })
});
export const ScheduleType = new GraphQLObjectType({
    name: "Schedule",
    fields: () => ({
        monday: { type: GraphQLList(DaySlotType) },
        tuesday: { type: GraphQLList(DaySlotType) },
        wednesday: { type: GraphQLList(DaySlotType) },
        thursday: { type: GraphQLList(DaySlotType) },
        friday: { type: GraphQLList(DaySlotType) }
    })
})