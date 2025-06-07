'use client';
import { useParams } from "next/navigation";
import { getTeacherSchedule } from "@/utils/getTeacherSchedule";
import { useEffect, useState } from "react";
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
                console.log(schedule);
                setScheduleLoading(false);
            })
    }, [])

    return <>{params.teacherCode}</>;
}
