'use client';

import React from 'react';
import { dayKeys, timeArray } from './utils';
import ScheduleHeaderRow from './ScheduleHeaderRow';
import ScheduleSlotCell from './ScheduleSlotCell';
import useScheduleStore from '@/stores/useScheduleStore';

export default function ScheduleGrid() {
    const { stagingSchedule } = useScheduleStore();

    if (!stagingSchedule) return null;

    return (
        <div className="min-w-[700px] w-full bg-gray-200 rounded grid grid-cols-6 grid-rows-9 gap-0.5 p-0.5">
            <ScheduleHeaderRow />

            {timeArray.map((time, rowIndex) => (
                <React.Fragment key={`row-${time}`}>
                    {/* Time label cell */}
                    <div className="bg-primary text-primary-foreground font-semibold text-sm flex justify-center items-center border border-gray-300 min-h-[70px]">
                        {time}
                    </div>

                    {dayKeys.map((day) => (
                        <ScheduleSlotCell
                            key={`slot-${time}-${day}`}
                            day={day}
                            slotNumber={rowIndex + 1}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
