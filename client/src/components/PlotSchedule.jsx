import React from 'react';

const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayKeys = dayArray.map(day => day.toLowerCase());
const timeArray = ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30", "4:30"];

export default function PlotSchedule({ schedule }) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[700px] w-full bg-gray-200 rounded grid grid-cols-6 grid-rows-9 gap-0.5 p-0.5">

                {/* Header Row */}
                <div className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300">
                    Slot/Day
                </div>

                {dayArray.map((day) => (
                    <div
                        key={`header-${day}`}
                        className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300"
                    >
                        {day}
                    </div>
                ))}

                {/* Time Slots */}
                {timeArray.map((time, rowIndex) => (
                    <React.Fragment key={`row-${time}`}>
                        {/* Time label */}
                        <div className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300 min-h-[70px]">
                            {time}
                        </div>

                        {dayKeys.map((day) => {
                            const currentSlot = findSlot(schedule[day], rowIndex + 1);
                            return (
                                <div
                                    key={`slot-${time}-${day}`}
                                    className={`${currentSlot ? currentSlot.type == "theory" ? 'bg-violet-100 border-violet-400' : 'bg-blue-100 border-violet-400' : 'bg-white'}
                                     p-1 border border-gray-300 rounded flex flex-col justify-center items-center min-h-[70px] text-center`}
                                >
                                    {currentSlot ? (
                                        <>
                                            <span className="text-sm text-secondary-foreground leading-tight">{currentSlot.subject}</span>
                                            <span className="text-xs text-muted-foreground">{currentSlot.room}</span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">No Class</span>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

function findSlot(slotArray, slotNumber) {
    return slotArray.find((slot) => slot.slot === slotNumber);
}
