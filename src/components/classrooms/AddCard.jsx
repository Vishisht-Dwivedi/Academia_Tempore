import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import createClassroomByRoom from "@/utils/createClassroomByRoom"
export default function AddClassroomCard() {
    const [room, setRoom] = useState('');
    const handleSubmit = async () => {
        if (!room) return;
        const res = await createClassroomByRoom(room);
        if (res.success) {
            alert(`Room: ${room} created successfully`)
            return window.location.reload();
        };
        alert(`Room: ${room} creation failed with error: ${res.error}`);
        return window.location.reload();
    }
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
                                <Input id="AddRoom" type="text" placeholder="TC-104" value={room} onChange={(e) => setRoom(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-col gap-2">
                        <Button type="submit" className="w-full" id="add" onClick={handleSubmit}>
                            Add
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}