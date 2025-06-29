import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarCog } from "lucide-react"
import { TrashIcon } from "lucide-react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import deleteTeacher from "@/utils/deleteTeacher"
export default function ScrollContent({ elementArray }) {
    const handleDelete = async (code) => {
        try {
            const res = await deleteTeacher(code);
            alert(res.success);
            return window.location.reload();
        } catch (error) {
            alert(error.message);
            return window.location.reload();
        }

    }
    const getTotalClasses = (schedule) => {
        let totalClasses = 0;
        for (const day of Object.keys(schedule)) {
            totalClasses += schedule[day]?.length;
        }
        return totalClasses;
    }
    return (
        <ScrollArea className="h-70 px-2">
            <ol className="h-auto px-2">
                {elementArray?.map((val, index) => {
                    return (
                        <li key={index}>
                            <div className="text-sm w-full flex justify-between">
                                <p>
                                    {val.name} <br />
                                    Classes: {getTotalClasses(val.schedule)}
                                </p>
                                <div className="flex gap-2">
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Link href={`./teachers/${val.code}`}>
                                                <Button>
                                                    <CalendarCog />
                                                </Button>
                                            </Link>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-40 p-2.5">
                                            <p className="text-sm">View Schedule</p>
                                        </HoverCardContent>
                                    </HoverCard>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button variant="destructive" onClick={() => { handleDelete(val.code) }}>
                                                <TrashIcon />
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-40 p-2.5">
                                            <p className="text-sm">Delete</p>
                                        </HoverCardContent>
                                    </HoverCard>

                                </div>
                            </div>
                            <Separator className="my-2" />
                        </li>
                    )
                })}
            </ol>
        </ScrollArea>
    );
}