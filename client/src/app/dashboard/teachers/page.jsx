import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Page() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                Manage Teachers
            </h1>
            <p className="text-center text-l font-medium tracking-wide text-indigo-400 mt-2">
                View, Add, Delete and Update Teachers and their Schedule
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3 w-3/4">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add/Delete Teacher</CardTitle>
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
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                All Teachers
                            </CardTitle>
                            <CardDescription>
                                Scroll to browse through all teachers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action="">
                                <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-col gap-3">
                                        <Label htmlFor="SearchName">
                                            Find teacher by name
                                        </Label>
                                        <Input id="SearchName" type="text" placeholder="Dr. Rakesh Chaurasia" />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <Button>
                    View Schedule
                </Button>
                <Button>
                    Update Schedule
                </Button>
            </div>
        </div>
    )
}