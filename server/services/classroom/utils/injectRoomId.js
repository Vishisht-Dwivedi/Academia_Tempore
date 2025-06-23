/**
 * Injects the given roomId into each slot in the schedule.
 *
 * @param {Array<Object>} schedule - The classroom's parsed schedule (array of day-wise objects)
 * @param {ObjectId} roomId - The ObjectId of the classroom
 * @returns {Array<Object>} - New schedule array with roomId added to each slot
 */
export default function injectRoomId(schedule, roomId) {
    return schedule.map(day => ({
        ...day,
        slots: day.slots.map(slot => ({ ...slot, room: roomId }))
    }));
}
