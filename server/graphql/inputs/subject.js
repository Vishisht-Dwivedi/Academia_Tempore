import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { TeacherInputType } from "./teacher.js";
export const SubjectInputType = new GraphQLInputObjectType({
    name: "SubjectInput",
    fields: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) }, // "theory" or "lab"
        teachers: { type: new GraphQLList(TeacherInputType) },
    },
});
