import React from 'react';
import { dayArray, dayKeys, timeArray, findSlot } from './utils';
import ScheduleHeaderRow from './ScheduleHeaderRow';
import ScheduleSlotCell from './ScheduleSlotCell';

export default function ScheduleGrid({ schedule }) {
    return (
        <div className="min-w-[700px] w-full bg-gray-200 rounded grid grid-cols-6 grid-rows-9 gap-0.5 p-0.5">
            <ScheduleHeaderRow />

            {timeArray.map((time, rowIndex) => (
                <React.Fragment key={`row-${time}`}>
                    {/* Time label */}
                    <div className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300 min-h-[70px]">
                        {time}
                    </div>

                    {dayKeys.map((day) => {
                        const currentSlot = findSlot(schedule[day], rowIndex + 1);
                        return (
                            <ScheduleSlotCell
                                key={`slot-${time}-${day}`}
                                slot={currentSlot}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}
