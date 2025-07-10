import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from "graphql";
import { ScheduleType } from "./Schedule.js";
import getClassroomSchedule from "../../services/classroom/utils/getClassroomSchedule.js";

export const ClassroomType = new GraphQLObjectType({
    name: "Classroom",
    fields: () => ({
        _id: { type: GraphQLID },
        room: { type: GraphQLString },
        schedule: {
            type: ScheduleType,
            resolve: async (parent) => {
                if (parent._type === "Classroom") {
                    return await getClassroomSchedule(parent._id);
                }
                return null;
            }
        }
    })
});
