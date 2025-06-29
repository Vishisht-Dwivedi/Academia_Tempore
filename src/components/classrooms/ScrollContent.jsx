"use client";
import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

import deleteClassroom from "@/utils/deleteClassroom";
import ClassroomItem from "./ClassroomItem"; // new component

export default function ScrollContent({ elementArray = [] }) {
    const handleDelete = async (room) => {
        const res = await deleteClassroom(room);
        if (res.success) {
            alert(`Classroom "${room}" deleted successfully.`);
        } else {
            alert(`Problem deleting classroom "${room}".`);
        }
        window.location.reload();
    };

    return (
        <ScrollArea className="h-[70vh] px-2">
            {elementArray.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-4">
                    No entries found.
                </p>
            ) : (
                <ol className="space-y-2">
                    {elementArray.map((val, index) => (
                        <Fragment key={val.room || index}>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={`item-${index}`}>
                                    <ClassroomItem val={val} handleDelete={handleDelete} />
                                </AccordionItem>
                            </Accordion>
                            <Separator />
                        </Fragment>
                    ))}
                </ol>
            )}
        </ScrollArea>
    );
}
