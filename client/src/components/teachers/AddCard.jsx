import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
export default function AddTeacherCard() {
    return (
        <div className="w-2/5">
            <Card>
                <CardHeader>
                    <CardTitle>Add Teacher</CardTitle>
                    <CardDescription>
                        Fill in the name and code for the teacher
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="">
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="AddName">
                                    Enter name
                                </Label>
                                <Input id="AddName" type="text" placeholder="Dr. Rakesh Chaurasia" />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="AddCode">
                                    Enter Code
                                </Label>
                                <Input id="AddCode" type="text" placeholder="RC" />
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