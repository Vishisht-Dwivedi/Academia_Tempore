import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLError } from "graphql";
import { ScheduleType } from "./Schedule.js";
import getClassroomSchedule from "../../logic/getClassroomSchedule.js";
export const ClassroomType = new GraphQLObjectType({
    name: "Classroom",
    fields: () => ({
        room: { type: GraphQLString },
        schedule: {
            type: ScheduleType,
            resolve: async (parent) => {
                try {
                    return await getClassroomSchedule(parent._id);
                } catch (error) {
                    throw new GraphQLError(`${error.message} for room: ${parent.room}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }
            }
        }
    })
})