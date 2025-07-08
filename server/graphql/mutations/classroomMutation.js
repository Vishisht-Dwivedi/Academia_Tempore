import { GraphQLString, GraphQLNonNull } from "graphql";
import { ClassroomType } from "../types/Classroom.js";
import { ClassroomInputType } from "../inputs/classroom.js";
import { DeleteResultType } from "../types/Delete.js";

import { createClassroom } from "../../services/classroom/create.js";
import deleteClassroom from "../../services/classroom/delete.js";

export const classroomMutation = {
    // Create Classroom
    createClassroom: {
        type: ClassroomType,
        args: {
            classroom: { type: ClassroomInputType },
        },
        resolve: async (_, { classroom }) => {
            const result = await createClassroom(classroom.room);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    },

    // Delete Classroom
    deleteClassroom: {
        type: DeleteResultType,
        args: {
            room: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, { room }) => {
            const result = await deleteClassroom(room);
            if (!result.success) throw new Error(result.message);
            return result;
        },
    }
};
