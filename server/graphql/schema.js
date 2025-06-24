import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLSchema } from "graphql";
import { ClassroomType } from "./types/Classroom.js";
import { SubjectType } from "./types/Subject.js";
import { TeacherType } from "./types/Teacher.js";
import { getAllTeachers, getTeacherByCode } from "../services/teacher/read.js";
import { getAllSubjects, getSubjectByCodeAndType } from "../services/subject/read.js";
import { getAllClassrooms, getClassroom } from "../services/classroom/read.js";
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
                return await getAllClassrooms();
            }
        },
        classroom: {
            type: ClassroomType,
            args: { room: { type: GraphQLString } },
            resolve: async (_, args) => {
                return await getClassroom(args.room);
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery
})

export default schema;