import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError } from "graphql";
import { getSubjectByID } from "../../services/read/readSubject.js";
import { getClassroomByID } from "../../services/read/readClassroom.js";
import { ScheduleType } from "./Schedule.js";
import { SubjectType } from "./Subject.js";
import getTeacherSchedule from "../../logic/getTeacherSchedule.js";
import { ClassroomType } from "./Classroom.js";
export const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        subjects: {
            type: new GraphQLList(SubjectType),
            resolve: async (parent) => {
                if (!parent.subjects || parent.subjects.length === 0) return [];
                try {
                    const resolvedSubjects = await Promise.all(
                        parent.subjects.map(getSubjectByID)
                    );
                    return resolvedSubjects;
                } catch (error) {
                    throw new GraphQLError(`${error.message} for teacher: ${parent.name}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }
            }
        },
        classes: {
            type: new GraphQLList(ClassroomType),
            resolve: async (parent) => {
                if (!parent.classes || parent.classes.length === 0) return [];
                try {
                    const resolvedClassrooms = await Promise.all(
                        parent.classes.map(getClassroomByID)
                    );
                    return resolvedClassrooms;
                } catch (error) {
                    throw new GraphQLError(`${error.message} for teacher: ${parent.name}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }
            }
        },
        schedule: {
            type: ScheduleType,
            resolve: async (parent) => {
                try {
                    return await getTeacherSchedule(parent._id);
                } catch (error) {
                    throw new GraphQLError(`${error.message} for teacher: ${parent.name}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }

            }
        }
    })
})