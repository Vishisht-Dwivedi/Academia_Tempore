import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ScrollContent from "./ScrollContent"
import { Spinner } from "@/components/ui/spinner"
import { useRef, useState } from "react"
export default function AllSubjectsCard({ elementArray, state }) {
    const [inputSubject, setInputSubject] = useState('');
    const throttleTracker = useRef(Date.now());
    const handleInput = (e) => {
        const inputVal = e.target.value;
        //throttling issue was occuring so setting it to immediate empty
        if (inputVal === "") {
            setInputSubject("");
            return;
        }
        if (Date.now() - throttleTracker.current > 300) {
            setInputSubject(inputVal);
            throttleTracker.current = Date.now();
        }
    }
    const filteredArray = inputSubject ?
        elementArray.filter(element => element.name.toLowerCase().includes(inputSubject.toLowerCase()))
        : elementArray;

    return (
        <div className="w-3/5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        All Subjects
                    </CardTitle>
                    <CardDescription>
                        Scroll to browse through all Subjects
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                    <form>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="SearchName">
                                    Find subject by name
                                </Label>
                                <Input id="SearchName" type="text" placeholder="Software Engineering" onChange={handleInput} />
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