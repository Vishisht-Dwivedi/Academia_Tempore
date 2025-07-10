import { GraphQLString, GraphQLList } from "graphql";
import { SubjectType } from "../types/Subject.js";
import { findSubject, getAllSubjects } from "../../services/subject/read.js";

export const subjectQuery = {
    // Get a specific subject by code + type
    subject: {
        type: SubjectType,
        args: {
            code: { type: GraphQLString },
            type: { type: GraphQLString },
        },
        resolve: async (_, { code, type }) => {
            return await findSubject({ code, type });
        },
    },

    // Get all subjects (name, code, type)
    allSubjects: {
        type: new GraphQLList(SubjectType),
        resolve: async () => {
            return await getAllSubjects();
        },
    },
};
