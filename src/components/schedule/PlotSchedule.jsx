import React, { useEffect } from 'react';
import ScheduleGrid from './ScheduleGrid';
import useAllSubjectsStore from '@/stores/useAllSubjectsStore';
import useAllTeachersStore from '@/stores/useAllTeachersStore';
import { fetchAllTeachers } from '@/utils/getAllTeachers';
import { fetchAllSubjects } from '@/utils/getAllSubjects';

export default function PlotSchedule() {
    const setTeachers = useAllTeachersStore((state) => state.setTeachers);
    const setSubjects = useAllSubjectsStore((state) => state.setSubjects);

    useEffect(() => {
        fetchAllTeachers().then(setTeachers).catch(console.error);
        fetchAllSubjects().then(setSubjects).catch(console.error);
    }, []);

    return (
        <div className="overflow-x-auto w-full">
            <ScheduleGrid />
        </div>
    );
}
