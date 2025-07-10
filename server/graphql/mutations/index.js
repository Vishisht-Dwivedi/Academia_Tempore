import { GraphQLObjectType } from "graphql";
import { teacherMutation } from "./teacherMutations.js";
import { subjectMutation } from "./subjectMutations.js";
import { scheduleMutation } from "./scheduleMutation.js";
import { classroomMutation } from "./classroomMutation.js";
export const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...teacherMutation,
        ...subjectMutation,
        ...scheduleMutation,
        ...classroomMutation
    },
});
