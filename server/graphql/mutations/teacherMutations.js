import { GraphQLString } from "graphql";
import { TeacherType } from "../types/Teacher.js";
import { TeacherInputType } from "../inputs/teacher.js";
import createTeacher from "../../services/teacher/create.js";
import { updateTeacher } from "../../services/teacher/update.js";
import deleteTeacher from "../../services/teacher/delete.js";

// Reusable result type for deletions
import { GraphQLObjectType } from "graphql";

const DeleteResultType = new GraphQLObjectType({
    name: "DeleteResult",
    fields: () => ({
        success: { type: GraphQLString },
        message: { type: GraphQLString },
    }),
});

export const teacherMutation = {
    // Create teacher
    createTeacher: {
        type: TeacherType,
        args: {
            teacher: { type: TeacherInputType },
        },
        resolve: async (_, { teacher }) => {
            const result = await createTeacher(teacher);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    },

    // Update teacher
    updateTeacher: {
        type: TeacherType,
        args: {
            teacher: { type: TeacherInputType },
        },
        resolve: async (_, { teacher }) => {
            const result = await updateTeacher(teacher);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    },

    // Delete teacher
    deleteTeacher: {
        type: DeleteResultType,
        args: {
            code: { type: GraphQLString },
        },
        resolve: async (_, { code }) => {
            return await deleteTeacher(code);
        },
    },
};
