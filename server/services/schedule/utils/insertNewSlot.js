export default async function insertNewSlot({ day, slot, teacher, subject, classroom }) {
    const daySchedule = classroom.schedule.find(d => d.day === day);

    const newSlot = {
        slot: slot.slot,
        teacher: teacher._id,
        subject: subject._id
    };

    if (daySchedule) {
        daySchedule.slots.push(newSlot);
    } else {
        classroom.schedule.push({
            day,
            slots: [newSlot]
        });
    }

    await classroom.save();
}
