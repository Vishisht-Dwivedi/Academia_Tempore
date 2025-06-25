import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLSchema, GraphQLNonNull } from "graphql";
import { ClassroomType } from "./types/Classroom.js";
import { SubjectType } from "./types/Subject.js";
import { TeacherType } from "./types/Teacher.js";
import { getAllTeachers, getTeacherByCode } from "../services/teacher/read.js";
import { getAllSubjects, getSubjectByCodeAndType } from "../services/subject/read.js";
import { getAllClassrooms, getClassroom } from "../services/classroom/read.js";

//creation functions
import createTeacher from "../services/teacher/create.js";
import createSubject from "../services/subject/create.js";

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
    })
})
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery
})

export default schema;