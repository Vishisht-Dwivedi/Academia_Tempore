import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrashIcon } from "lucide-react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import deleteSubject from "@/utils/deleteSubject"
export default function ScrollContent({ elementArray }) {
    const handleDelete = async (code, type) => {
        try {
            const res = await deleteSubject(code, type);
            alert(res);
            return window.location.reload();
        } catch (error) {
            alert(error.message);
            return window.location.reload();
        }

    }
    return (
        <ScrollArea className="h-70 px-2">
            <ol className="h-auto px-2">
                {elementArray?.map((val, index) => {
                    return (
                        <li key={index}>
                            <div className="text-sm w-full flex justify-between">
                                <p>{val.name} <br /> {val.type} </p>
                                <div className="flex gap-2">
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Button variant="destructive" onClick={() => { handleDelete(val.code, val.type) }}>
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