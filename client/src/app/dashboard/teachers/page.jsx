import { Button } from "@/components/ui/button"
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
                View, Add or Update Teachers and their Schedule
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        <CardAction>Card Action</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
                <Button variant="outline">
                    Add
                </Button>
                <Button>
                    View All
                </Button>
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