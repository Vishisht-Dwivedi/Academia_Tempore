import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError, GraphQLSchema } from "graphql";

import { ClassroomType } from "./types/Classroom.js";
import { ScheduleType } from "./types/Schedule.js";
import { SubjectType } from "./types/Subject.js";
import { TeacherType } from "./types/Teacher.js";
import { getAllTeachers, getTeacherByCode } from "../services/read/readTeacher.js";

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
        }
    })
});
const schema = new GraphQLSchema({
    query: RootQuery
})
export default schema;