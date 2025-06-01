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
        monday: { type: new GraphQLList(DaySlotType) },
        tuesday: { type: new GraphQLList(DaySlotType) },
        wednesday: { type: new GraphQLList(DaySlotType) },
        thursday: { type: new GraphQLList(DaySlotType) },
        friday: { type: new GraphQLList(DaySlotType) }
    })
})