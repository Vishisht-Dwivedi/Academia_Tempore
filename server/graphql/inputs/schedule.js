import { GraphQLInputObjectType, GraphQLList } from "graphql";
import { SlotInputType } from "./slot.js";

export const ScheduleInputType = new GraphQLInputObjectType({
    name: "ScheduleInput",
    fields: {
        monday: { type: new GraphQLList(SlotInputType) },
        tuesday: { type: new GraphQLList(SlotInputType) },
        wednesday: { type: new GraphQLList(SlotInputType) },
        thursday: { type: new GraphQLList(SlotInputType) },
        friday: { type: new GraphQLList(SlotInputType) },
    },
});
