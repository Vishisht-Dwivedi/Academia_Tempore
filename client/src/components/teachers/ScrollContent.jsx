import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarCog } from "lucide-react"
import { TrashIcon } from "lucide-react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
export default function ScrollContent({ elementArray }) {
    return (
        <ScrollArea className="h-70 px-2">
            <ol className="h-auto px-2">
                {elementArray?.map((val, index) => {
                    return (
                        <li key={index}>
                            <div className="text-sm w-full flex justify-between">
                                {val}
                                <div className="flex gap-2">
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button>
                                                <CalendarCog />
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-40 p-2.5">
                                            <p className="text-sm">View Schedule</p>
                                        </HoverCardContent>
                                    </HoverCard>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button variant="outline">
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