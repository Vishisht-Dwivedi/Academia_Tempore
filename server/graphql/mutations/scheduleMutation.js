import { GraphQLString } from "graphql";
import { ScheduleInputType } from "../inputs/schedule.js";
import { updateSchedule } from "../../services/schedule/update.js";

export const scheduleMutation = {
    updateSchedule: {
        type: GraphQLString,
        args: {
            schedule: { type: ScheduleInputType },
        },
        resolve: async (_, { schedule }) => {
            try {
                const result = await updateSchedule(schedule);
                return result.message;
            } catch (err) {
                throw new Error(err.message || "Failed to update schedule");
            }
        },
    },
};
