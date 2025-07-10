import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql";
import { TeacherType } from "./Teacher.js";
import { SubjectType } from "./Subject.js";
export const ScheduleSlotType = new GraphQLObjectType({
    name: "ScheduleSlot",
    fields: () => ({
        slot: { type: new GraphQLNonNull(GraphQLInt) },
        teacher: { type: new GraphQLNonNull(TeacherType) },
        subject: { type: new GraphQLNonNull(SubjectType) },
        room: { type: new GraphQLNonNull(GraphQLString) }
    }),
});

export const ScheduleType = new GraphQLObjectType({
    name: "Schedule",
    fields: () => ({
        monday: { type: new GraphQLList(ScheduleSlotType) },
        tuesday: { type: new GraphQLList(ScheduleSlotType) },
        wednesday: { type: new GraphQLList(ScheduleSlotType) },
        thursday: { type: new GraphQLList(ScheduleSlotType) },
        friday: { type: new GraphQLList(ScheduleSlotType) },
    }),
});