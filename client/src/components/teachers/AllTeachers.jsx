import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ScrollContent from "./ScrollContent"
import { Spinner } from "@/components/ui/spinner"
export default function AllTeachersCard({ elementArray, state }) {
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
                                <Input id="SearchName" type="text" placeholder="Dr. James Bond" />
                            </div>
                        </div>
                    </form>
                    <Separator className="my-2" />
                    {state ? <Spinner /> : <ScrollContent elementArray={elementArray} />}
                    <Separator className="my-2" />
                </CardContent>
            </Card>
        </div>

    )
}