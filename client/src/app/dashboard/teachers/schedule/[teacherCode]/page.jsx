'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTeacherSchedule } from "@/utils/getTeacherSchedule";
import { Spinner } from "@/components/ui/spinner";
import PlotSchedule from "@/components/schedule/PlotSchedule";
import { Button } from "@/components/ui/button";
import useScheduleStore from "@/stores/useScheduleStore";
import updateSchedule from "@/utils/updateSchedule";

export default function TeacherSchedule() {
    const { teacherCode } = useParams();
    const {
        schedule,
        stagingSchedule,
        setSchedule,
        setStagingSchedule,
        resetStaging
    } = useScheduleStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTeacherSchedule(teacherCode)
            .then((res) => {
                setSchedule(res);
                setStagingSchedule(structuredClone(res.schedule));
            })
            .catch((err) => console.error("Failed to fetch schedule:", err))
            .finally(() => setLoading(false));
    }, [teacherCode]);

    const handleDiscardChanges = () => {
        setStagingSchedule(structuredClone(schedule.schedule));
    };

    const handlePublishChanges = () => {
        console.log("Publishing...", stagingSchedule);
        updateSchedule(stagingSchedule);
    };

    const hasUnsavedChanges =
        schedule &&
        JSON.stringify(stagingSchedule) !== JSON.stringify(schedule.schedule);

    if (loading) return <Spinner />;
    if (!schedule) return <div className="text-center text-red-500">No record found</div>;

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                {schedule.name}
            </h1>

            <PlotSchedule />

            {hasUnsavedChanges && (
                <div className="flex gap-4 mt-4">
                    <Button variant="outline" onClick={handleDiscardChanges}>
                        Discard
                    </Button>
                    <Button onClick={handlePublishChanges}>Publish Changes</Button>
                </div>
            )}
        </div>
    );
}
