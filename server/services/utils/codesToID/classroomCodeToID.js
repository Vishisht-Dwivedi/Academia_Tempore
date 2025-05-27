import ClassroomModel from "../../../models/Classrooms.js";
export default async function classroomCodeToID(classes) {
    // Convert classroom names to IDs
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
