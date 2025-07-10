'use client';

import React from 'react';
import { dayKeys, timeArray } from './utils';
import ScheduleHeaderRow from './ScheduleHeaderRow';
import ScheduleSlotCell from './ScheduleSlotCell';
import useScheduleStore from '@/stores/useScheduleStore';

export default function ScheduleGrid() {
    const { schedule, stagingSchedule } = useScheduleStore();

    // If either schedule is not loaded yet, don't render
    if (!schedule?.schedule || !stagingSchedule) return null;

    // Determine if we're in "room" view or "teacher" view
    const viewMode = schedule.room ? 'room' : 'teacher';

    return (
        <div className="min-w-[700px] w-full bg-gray-200 rounded grid grid-cols-6 grid-rows-9 gap-0.5 p-0.5">
            <ScheduleHeaderRow />

            {timeArray.map((time, rowIndex) => (
                <React.Fragment key={`row-${time}`}>
                    {/* Time label cell */}
                    <div className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300 min-h-[70px]">
                        {time}
                    </div>

                    {dayKeys.map((day) => {
                        const slot = stagingSchedule?.[day]?.find(
                            (s) => s?.slot === rowIndex + 1
                        );
                        return (
                            <ScheduleSlotCell
                                key={`slot-${time}-${day}`}
                                day={day}
                                slotNumber={rowIndex + 1}
                                inputSlot={slot}
                                roomOrTeacher={viewMode}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}
