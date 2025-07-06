import { GraphQLString, GraphQLList } from "graphql";
import { ClassroomType } from "../types/Classroom.js";
import { findClassroom, getAllClassrooms } from "../../services/classroom/read.js";

/**
 * Classroom-related GraphQL queries
 */
export const classroomQuery = {
    // Get a single classroom by room
    classroom: {
        type: ClassroomType,
        args: {
            room: { type: GraphQLString },
        },
        resolve: async (_, { room }) => {
            const roomDoc = await findClassroom({ room });
            return { ...roomDoc, _type: "Classroom" }
        },
    },

    // Get all classrooms
    allClassrooms: {
        type: new GraphQLList(ClassroomType),
        resolve: async () => {
            const roomArray = await getAllClassrooms();
            return roomArray.map((room) => { return { ...room, _type: "Classroom" } });
        },
    },
};
