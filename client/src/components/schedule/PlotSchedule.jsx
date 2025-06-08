import React from 'react';
import { dayArray, dayKeys, timeArray } from './utils';
import ScheduleGrid from './ScheduleGrid';

export default function PlotSchedule({ schedule }) {
    return (
        <div className="overflow-x-auto">
            <ScheduleGrid schedule={schedule} />
        </div>
    );
}
