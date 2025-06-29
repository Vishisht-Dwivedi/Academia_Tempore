"use client";
import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionItem,
} from "@/components/ui/accordion";

import deleteTeacher from "@/utils/deleteTeacher";
import TeacherItem from "./TeacherItem";
export default function ScrollContent({ elementArray = [] }) {
    const handleDelete = async (code) => {
        const res = await deleteTeacher(code);
        if (res.success) {
            alert(`Teacher: "${code}" delete successfully`);
        } else {
            alert(`Problem with deletion of Teacher: "${code}"`);
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
                        <Fragment key={val.code || index}>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={`item-${index}`}>
                                    {/* Custom Header */}
                                    <TeacherItem handleDelete={handleDelete} val={val} />
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
