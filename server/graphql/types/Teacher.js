import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { ClassroomType } from "./Classroom.js";
import { SubjectType } from "./Subject.js";
import { ScheduleType } from "./Schedule.js";
import getTeacherSchedule from "../../services/teacher/utils/getTeacherSchedule.js";
export const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        email: { type: GraphQLString },
        classes: { type: new GraphQLList(ClassroomType) },
        subjects: { type: new GraphQLList(SubjectType) },
        schedule: {
            type: ScheduleType,
            resolve: async (parent) => {
                if (parent._type === "Teacher") {
                    return await getTeacherSchedule(parent._id);
                }
                return null;
            }
        },
    }),
});
