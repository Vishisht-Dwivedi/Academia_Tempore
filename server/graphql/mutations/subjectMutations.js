import { GraphQLString } from "graphql";
import { SubjectType } from "../types/Subject.js";
import { SubjectInputType } from "../inputs/subject.js";

import createSubject from "../../services/subject/create.js";
import { updateSubject } from "../../services/subject/update.js";
import deleteSubject from "../../services/subject/delete.js";

export const subjectMutation = {
    createSubject: {
        type: SubjectType,
        args: {
            input: { type: SubjectInputType },
        },
        resolve: async (_, { input }) => {
            const result = await createSubject(input);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    },

    updateSubject: {
        type: SubjectType,
        args: {
            input: { type: SubjectInputType },
        },
        resolve: async (_, { input }) => {
            const result = await updateSubject(input);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    },

    deleteSubject: {
        type: GraphQLString,
        args: {
            code: { type: GraphQLString },
            type: { type: GraphQLString },
        },
        resolve: async (_, { code, type }) => {
            const result = await deleteSubject(code, type);
            if (!result.success) throw new Error(result.error);
            return result.message;
        },
    },
};
