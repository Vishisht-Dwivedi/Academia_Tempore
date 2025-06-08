export const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const dayKeys = dayArray.map((day) => day.toLowerCase());
export const timeArray = ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30", "4:30"];

export function findSlot(slotArray, slotNumber) {
    return slotArray?.find((slot) => slot.slot === slotNumber);
}