import { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import deleteSubject from "@/utils/deleteSubject";

export default function ScrollContent({ elementArray = [] }) {
    const handleDelete = async (code, type) => {
        try {
            const res = await deleteSubject(code, type);
            alert(res);
        } catch (error) {
            alert(error.message);
        } finally {
            window.location.reload();
        }
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
                        <Fragment key={`${val.code}-${val.type}` || index}>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={`item-${index}`}>
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-3 py-1 rounded-md">
                                        <AccordionTrigger className="flex-1 text-left items-center justify-center">
                                            <span className="text-sm font-medium">{val.name} ({val.type})</span>
                                        </AccordionTrigger>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(val.code, val.type)}
                                        >
                                            <TrashIcon className="h-6 w-6" />
                                        </Button>
                                    </div>

                                    {/* Accordion Content (optional for future use) */}
                                    <AccordionContent className="px-3 pb-2 text-sm space-y-1 text-muted-foreground">
                                        <p className="text-xs italic">
                                            Code: {val.code}
                                        </p>
                                        <div className="flex flex-col flex-wrap gap-1 text-xs text-muted-foreground">
                                            {val.teachers.map((teacher, idx) => (
                                                <span key={idx}>
                                                    <Link href={`/dashboard/teachers/${teacher.code}`} className="underline underline-offset-2">{teacher.name}</Link>
                                                </span>
                                            ))}
                                        </div>
                                    </AccordionContent>
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
