// data im expecting
// {
//   "monday": [
//     {
//       "slot": 5,
//       "subject": "Software Engineering",
//       "type": "theory",
//       "room": "TC-104",
//       "teacher": "Dr. Rekha Kaushik"
//     }
//   ],
// }
import { handleScheduleSlotUpdate } from "./utils/handleScheduleSlotUpdate.js";

export const updateSchedule = async (updatedSchedule) => {
    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    for (const day of weekDays) {
        if (!updatedSchedule[day]) continue;

        for (const slot of updatedSchedule[day]) {
            await handleScheduleSlotUpdate(day, slot);
        }
    }

    return {
        success: true,
        message: "Schedule updated successfully",
    };
};
