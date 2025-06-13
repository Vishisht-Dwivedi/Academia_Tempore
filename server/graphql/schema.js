import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLSchema } from "graphql";

import { ClassroomType } from "./types/Classroom.js";
import { ScheduleType } from "./types/Schedule.js";
import { SubjectType } from "./types/Subject.js";
import { TeacherType } from "./types/Teacher.js";
import { getAllTeachers, getTeacherByCode } from "../services/read/readTeacher.js";
import { getAllSubjects, getSubjectByCodeAndType } from "../services/read/readSubject.js";
import { getAllClassroom, getClassroomByRoom } from "../services/read/readClassroom.js";
import { ScheduleInputType } from "./inputs/ScheduleInput.js";
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        teachers: {
            type: new GraphQLList(TeacherType),
            resolve: async () => {
                return await getAllTeachers();
            }
        },
        teacher: {
            type: TeacherType,
            args: { code: { type: GraphQLString } },
            resolve: async (_, args) => {
                return await getTeacherByCode(args.code);
            }
        },
        subjects: {
            type: new GraphQLList(SubjectType),
            resolve: async () => {
                return await getAllSubjects();
            }
        },
        subject: {
            type: SubjectType,
            args: { code: { type: GraphQLString }, type: { type: GraphQLString } },
            resolve: async (_, args) => {
                return await getSubjectByCodeAndType({
                    code: args.code,
                    type: args.type
                })
            }
        },
        classrooms: {
            type: new GraphQLList(ClassroomType),
            resolve: async () => {
                return await getAllClassroom();
            }
        },
        classroom: {
            type: ClassroomType,
            args: { room: { type: GraphQLString } },
            resolve: async (_, args) => {
                return await getClassroomByRoom(args.room);
            }
        }
    })
});

const MutationQuery = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        updateSchedule: {
            type: ScheduleType,
            args: {
                schedule: { type: ScheduleInputType }
            },
            resolve: async (_, { schedule }) => {
                console.log("Schedule:", JSON.stringify(schedule, null, 2));
                return schedule;
            }
        }
    })
});
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery
})

export default schema;