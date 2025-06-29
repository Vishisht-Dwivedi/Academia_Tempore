import React from 'react';
import { dayArray } from './utils';

export default function ScheduleHeaderRow() {
    return (
        <>
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
        </>
    );
}
