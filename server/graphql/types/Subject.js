import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError } from "graphql";
import { TeacherType } from "./Teacher.js";
import { getTeacherByID } from "../../services/read/readTeacher.js";
export const SubjectType = new GraphQLObjectType({
    name: "Subject",
    fields: () => ({
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        type: { type: GraphQLString },
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: async (parent) => {
                if (!parent.teachers || !parent.teachers.length === 0) return [];
                try {
                    const resolvedTeachers = await Promise.all(
                        parent.teachers.map(getTeacherByID)
                    );
                    return resolvedTeachers;
                } catch (error) {
                    throw new GraphQLError(`${error.message} for subject: ${parent.name}, type: ${parent.type}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }
            }
        }
    })
});