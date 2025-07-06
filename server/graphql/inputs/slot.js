import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { SubjectInputType } from "./subject.js";
import { TeacherInputType } from "./teacher.js";

export const SlotInputType = new GraphQLInputObjectType({
    name: "SlotInput",
    fields: {
        slot: { type: new GraphQLNonNull(GraphQLInt) },
        subject: { type: new GraphQLNonNull(SubjectInputType) },
        teacher: { type: new GraphQLNonNull(TeacherInputType) },
        room: { type: new GraphQLNonNull(GraphQLString) }
    },
});
