import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLInt } from "graphql";
import { DaySlotInput } from "./DaySlotInput.js";
export const ScheduleInputType = new GraphQLInputObjectType({
    name: "ScheduleInput",
    fields: () => ({
        monday: { type: new GraphQLList(DaySlotInput) },
        tuesday: { type: new GraphQLList(DaySlotInput) },
        wednesday: { type: new GraphQLList(DaySlotInput) },
        thursday: { type: new GraphQLList(DaySlotInput) },
        friday: { type: new GraphQLList(DaySlotInput) }
    })
});