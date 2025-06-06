import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ScrollContent from "./ScrollContent"
import { Spinner } from "@/components/ui/spinner"
import { useRef, useState } from "react"
export default function AllTeachersCard({ elementArray, state }) {
    const [inputTeacher, setInputTeacher] = useState('');
    const throttleTracker = useRef(Date.now());
    const handleInput = (e) => {
        const inputVal = e.target.value;
        //throttling issue was occuring so setting it to immediate empty
        if (inputVal === "") {
            setInputTeacher("");
            return;
        }
        if (Date.now() - throttleTracker.current > 300) {
            setInputTeacher(inputVal);
            throttleTracker.current = Date.now();
        }
    }
    const filteredArray = inputTeacher ?
        elementArray.filter(element => element.toLowerCase().includes(inputTeacher.toLowerCase()))
        : elementArray;

    return (
        <div className="w-3/5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        All Teachers
                    </CardTitle>
                    <CardDescription>
                        Scroll to browse through all teachers
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                    <form>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="SearchName">
                                    Find teacher by name
                                </Label>
                                <Input id="SearchName" type="text" placeholder="Dr. James Bond" onChange={handleInput} />
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