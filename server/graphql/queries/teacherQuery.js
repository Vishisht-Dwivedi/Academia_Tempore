import { GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { TeacherType } from "../types/Teacher.js";
import { findTeacher, getAllTeachers } from "../../services/teacher/read.js";

/**
 * Teacher-related GraphQL queries
 */
export const teacherQuery = {
    // Get a single teacher by code
    teacher: {
        type: TeacherType,
        args: {
            code: { type: GraphQLString },
        },
        resolve: async (_, { code }) => {
            const teacher = await findTeacher({ code });
            return { ...teacher, _type: "Teacher" };
        }
    },

    // Get all teachers
    allTeachers: {
        type: new GraphQLList(TeacherType),
        resolve: async () => {
            const teachers = await getAllTeachers();
            return teachers.map(teacher => ({ ...teacher, _type: "Teacher" }));
        }
    },
};
