import { GraphQLObjectType } from "graphql";
import { teacherQuery } from "./teacherQuery.js";
import { subjectQuery } from "./subjectQuery.js";
import { classroomQuery } from "./classroomQuery.js";
export const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...teacherQuery,
        ...subjectQuery,
        ...classroomQuery
    },
});
