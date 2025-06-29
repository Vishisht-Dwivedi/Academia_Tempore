import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import createTeacher from "@/utils/createTeacher";

export default function AddTeacherCard() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async () => {
        if (!name || !code) {
            alert("Both name and code are required.");
            return;
        }

        try {
            const res = await createTeacher(name, code);
            if (res) {
                alert(`Teacher: ${name} created successfully`);
                return window.location.reload();
            }
        } catch (err) {
            alert(`Teacher creation failed: ${err.message}`);
            return window.location.reload();
        }
    };

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
                    <form>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="AddName">Enter name</Label>
                                <Input
                                    id="AddName"
                                    type="text"
                                    placeholder="Dr. Rakesh Chaurasia"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="AddCode">Enter code</Label>
                                <Input
                                    id="AddCode"
                                    type="text"
                                    placeholder="RC"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full"
                            id="add"
                            onClick={handleSubmit}
                        >
                            Add
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
