import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ScrollContent from "./ScrollContent"
import { Spinner } from "@/components/ui/spinner"
import { useRef, useState } from "react"

export default function AllClassroomsCard({ elementArray, state }) {
    const [inputClassroom, setInputClassroom] = useState('');
    const throttleTracker = useRef(Date.now());
    const handleInput = (e) => {
        const inputVal = e.target.value;
        //throttling issue was occuring so setting it to immediate empty
        if (inputVal === "") {
            setInputClassroom("");
            return;
        }
        if (Date.now() - throttleTracker.current > 300) {
            setInputClassroom(inputVal);
            throttleTracker.current = Date.now();
        }
    }
    const filteredArray = inputClassroom ?
        elementArray.filter(element => element.room.toLowerCase().includes(inputClassroom.toLowerCase()))
        : elementArray;

    return (
        <div className="w-3/5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        All Classrooms
                    </CardTitle>
                    <CardDescription>
                        Scroll to browse through all classrooms
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                    <form>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="SearchName">
                                    Find classroom by room number
                                </Label>
                                <Input id="SearchName" type="text" placeholder="TC-104" onChange={handleInput} />
                            </div>
                        </div>
                    </form>
                    <Separator className="my-2" />
                    {state ? <Spinner /> : <ScrollContent elementArray={filteredArray} />}
                    <Separator className="my-2" />
                </CardContent>
            </Card>
        </div>

    )
}