/**
 * Removes roomId from each slot in the schedule.
 *
 * @param {Array<Object>} schedule - Schedule with roomId in slots
 * @returns {Array<Object>} - Cleaned schedule without roomId in slots
 */
export default function stripRoomId(schedule) {
    return schedule.map(day => ({
        ...day,
        slots: day.slots.map(({ room, ...rest }) => rest)
    }));
}
