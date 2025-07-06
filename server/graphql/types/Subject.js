import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { TeacherType } from "./Teacher.js";
export const SubjectType = new GraphQLObjectType({
    name: "Subject",
    fields: () => ({
        _id: { type: GraphQLString },
        code: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        teachers: { type: new GraphQLList(TeacherType) },
    }),
});
