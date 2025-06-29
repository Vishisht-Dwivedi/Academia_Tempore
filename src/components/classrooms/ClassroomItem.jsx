"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarCog, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AccordionContent,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { getClassroomSchedule } from "@/utils/getClasssroomSchedule";

export default function ClassroomItem({ handleDelete, val }) {
    const [schedule, setSchedule] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const getTotalClasses = (schedule = {}) =>
        Object.values(schedule).reduce((acc, day) => acc + (day?.length || 0), 0);

    const handleAccordionToggle = async () => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        if (nextState && !schedule) {
            const fetched = await getClassroomSchedule(val.room);
            setSchedule(fetched.schedule);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center px-3 py-1 rounded-md">
                <AccordionTrigger
                    className="flex-1 text-left"
                    onClick={handleAccordionToggle}
                >
                    <span className="text-sm font-medium">{val.room}</span>
                </AccordionTrigger>

                <div className="flex gap-2 ml-2">
                    <Button asChild variant="outline">
                        <Link href={`./classrooms/${val.room}`}>
                            <CalendarCog className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(val.room)}
                    >
                        <TrashIcon className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {isOpen && (
                <AccordionContent className="px-3 pb-2 text-sm space-y-1">
                    {schedule ? (
                        <p>Slots/Week: {getTotalClasses(schedule)}</p>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">
                            Loading schedule...
                        </p>
                    )}
                </AccordionContent>
            )}
        </>
    );
}
