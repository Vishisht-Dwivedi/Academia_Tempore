"use client";

import Link from "next/link";
import { CalendarCog, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AccordionContent,
    AccordionTrigger
} from "@/components/ui/accordion";
import { useState } from "react";
import { getTeacherSchedule } from "@/utils/getTeacherSchedule";

export default function TeacherItem({ handleDelete, val }) {
    const [schedule, setSchedule] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const getTotalClasses = (schedule = {}) =>
        Object.values(schedule).reduce((acc, day) => acc + (day?.length || 0), 0);

    const handleAccordionToggle = async () => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        if (nextState && !schedule) {
            const fetchedSchedule = await getTeacherSchedule(val.code);
            setSchedule(fetchedSchedule.schedule);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center px-3 py-1 rounded-md">
                <AccordionTrigger
                    className="flex-1 text-left"
                    onClick={handleAccordionToggle}
                >
                    <span className="text-sm font-medium">{val.name}</span>
                </AccordionTrigger>

                <div className="flex gap-2 ml-2">
                    <Button asChild variant="outline">
                        <Link href={`./teachers/${val.code}`}>
                            <CalendarCog className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(val.code)}
                    >
                        <TrashIcon className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Only render content if accordion is open */}
            {isOpen && (
                <AccordionContent className="px-3 pb-2 text-sm space-y-1">
                    {schedule ? (
                        <>
                            <p>Slots/Week: {getTotalClasses(schedule)}</p>
                            <div className="flex flex-col flex-wrap gap-1 text-xs text-muted-foreground">
                                {val.subjects.map((subject, idx) => (
                                    <span key={idx}>
                                        {subject.name} ({subject.type})
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">Loading schedule...</p>
                    )}
                </AccordionContent>
            )}
        </>
    );
}
