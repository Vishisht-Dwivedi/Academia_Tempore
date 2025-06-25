import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} from "graphql";
import { SlotInputNestedType } from "./SlotInputNestedType.js";

export const DayScheduleInputType = new GraphQLInputObjectType({
    name: "DayScheduleInput",
    fields: {
        day: { type: new GraphQLNonNull(GraphQLString) },
        slots: { type: new GraphQLNonNull(new GraphQLList(SlotInputNestedType)) }
    }
});
