import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from "graphql";

// types
import { ClassroomType } from "./types/Classroom.js";
import { SubjectType } from "./types/Subject.js";
import { TeacherType } from "./types/Teacher.js";

// inputs
import { DayScheduleInputType } from "./inputs/DayScheduleInputType.js";
import { ScheduleInputType } from "./inputs/ScheduleInputType.js";
import { RemoveSlotInputType } from "./inputs/RemoveSlotInputType.js";

// read
import { getAllTeachers, getTeacherByCode } from "../services/teacher/read.js";
import { getAllSubjects, getSubjectByCodeAndType } from "../services/subject/read.js";
import { getAllClassrooms, getClassroom } from "../services/classroom/read.js";

// create
import createTeacher from "../services/teacher/create.js";
import createSubject from "../services/subject/create.js";
import createClassroom from "../services/classroom/create.js";

// update
import { updateSchedule } from "../services/schedule/update.js";

//delete
import { removeScheduleSlot } from "../services/schedule/delete.js";

// root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: async () => await getAllTeachers()
        },
        teacher: {
            type: TeacherType,
            args: {
                code: { type: GraphQLString }
            },
            resolve: async (_, args) => await getTeacherByCode(args.code)
        },
        subjects: {
            type: new GraphQLList(SubjectType),
            resolve: async () => await getAllSubjects()
        },
        subject: {
            type: SubjectType,
            args: {
                code: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            resolve: async (_, args) =>
                await getSubjectByCodeAndType({ code: args.code, type: args.type })
        },
        classrooms: {
            type: new GraphQLList(ClassroomType),
            resolve: async () => await getAllClassrooms()
        },
        classroom: {
            type: ClassroomType,
            args: {
                room: { type: GraphQLString }
            },
            resolve: async (_, args) => await getClassroom(args.room)
        }
    })
});

// mutation queries
const MutationQuery = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        createTeacher: {
            type: TeacherType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                const result = await createTeacher(args);
                if (!result.success) throw new Error(result.error);
                return result.data;
            }
        },
        createSubject: {
            type: SubjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                const result = await createSubject(args);
                if (!result.success) throw new Error(result.error);
                return result.data;
            }
        },
        createClassroom: {
            type: ClassroomType,
            args: {
                room: { type: new GraphQLNonNull(GraphQLString) },
                schedule: {
                    type: new GraphQLNonNull(new GraphQLList(DayScheduleInputType))
                }
            },
            resolve: async (_, { room, schedule }) => {
                const result = await createClassroom(room, schedule);
                if (!result.success) throw new Error(result.error);
                return result.data;
            }
        },
        updateSchedule: {
            type: new GraphQLObjectType({
                name: "UpdateScheduleResponse",
                fields: {
                    success: { type: GraphQLString },
                    message: { type: GraphQLString }
                }
            }),
            args: {
                schedule: { type: new GraphQLNonNull(ScheduleInputType) }
            },
            resolve: async (_, { schedule }) => {
                return await updateSchedule(schedule);
            }
        },
        removeScheduleSlot: {
            type: GraphQLString,
            args: {
                input: { type: new GraphQLNonNull(RemoveSlotInputType) }
            },
            resolve: async (_, { input }) => {
                const result = await removeScheduleSlot(input);
                if (!result.success) throw new Error(result.error || "Failed to remove slot");
                return result.message;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery
});

export default schema;
