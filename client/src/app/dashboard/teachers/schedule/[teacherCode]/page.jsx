'use client';
import { useParams } from "next/navigation";
import { getTeacherSchedule } from "@/utils/getTeacherSchedule";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PlotSchedule from "@/components/PlotSchedule";
export default function TeacherSchedule() {
    const [schedule, setSchedule] = useState(null);
    const [scheduleLoading, setScheduleLoading] = useState(true);
    const params = useParams();
    useEffect(() => {
        getTeacherSchedule(params.teacherCode)
            .then(res => {
                setSchedule(res);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setScheduleLoading(false);
            })
    }, [])

    return (
        <>
            {scheduleLoading ? <Spinner /> : <>
                <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                    {schedule.name}
                </h1>
                <PlotSchedule schedule={schedule.schedule} />
            </>}
        </>
    );
}
