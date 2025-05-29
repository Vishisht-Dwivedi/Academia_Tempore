import ClassroomModel from "../../../models/Classrooms.js";

/**
 * Converts an array of classroom names to their corresponding MongoDB ObjectIDs.
 *
 * @async
 * @function
 * @param {string[]} classes - An array of classroom names (e.g., ["B102", "C204"]).
 * @returns {Promise<ObjectId[]>} A promise that resolves to an array of ObjectIDs for the matching classrooms.
 *
 * @throws {Error} If any classroom with the given room name is not found in the database.
 *
 * @example
 * const classIds = await classroomCodeToID(["B102", "C204"]);
 * // Output: [ObjectId("..."), ObjectId("...")]
 */
export default async function classroomCodeToID(classes) {
    const classIds = await Promise.all(
        classes.map(async (roomName) => {
            const roomDoc = await ClassroomModel.findOne({ room: roomName });
            if (!roomDoc) {
                throw new Error(`Classroom with room '${roomName}' not found`);
            }
            return roomDoc._id;
        })
    );
    return classIds;
}
