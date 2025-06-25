import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
export default function AddClassroomCard() {
    return (
        <div className="w-2/5">
            <Card>
                <CardHeader>
                    <CardTitle>Add Classroom</CardTitle>
                    <CardDescription>
                        Fill in the noom number for the classroom
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="">
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="AddRoom">
                                    Enter room
                                </Label>
                                <Input id="AddRoom" type="text" placeholder="TC-104" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-col gap-2">
                        <Button type="submit" className="w-full" id="add">
                            Add
                        </Button>

                        <Button type="submit" variant="outline" className="w-full" id="delete">
                            Delete
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}