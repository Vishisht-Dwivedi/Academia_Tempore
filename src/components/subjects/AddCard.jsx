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
import createSubject from "@/utils/createSubject";

export default function AddSubjectCard() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = async () => {
        if (!name || !code || !type) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await createSubject(name, code, type);
            if (res) {
                alert(`Subject "${name}" created successfully`);
                return window.location.reload();
            }
        } catch (err) {
            alert(`Subject creation failed: ${err.message}`);
            return window.location.reload();
        }
    };

    return (
        <div className="w-2/5">
            <Card>
                <CardHeader>
                    <CardTitle>Add Subject</CardTitle>
                    <CardDescription>
                        Fill in the subject name, code, and type (e.g., theory/lab)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="w-full flex flex-col gap-3">
                            <Label htmlFor="subjectName">Subject Name</Label>
                            <Input
                                id="subjectName"
                                type="text"
                                placeholder="Software Engineering"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Label htmlFor="subjectCode">Code</Label>
                            <Input
                                id="subjectCode"
                                type="text"
                                placeholder="SE"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Label htmlFor="subjectType">Type</Label>
                            <Input
                                id="subjectType"
                                type="text"
                                placeholder="theory or lab"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>
                        Add Subject
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
