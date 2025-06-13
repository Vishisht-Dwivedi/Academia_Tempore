'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useScheduleStore from '@/stores/useScheduleStore';
import { Slot } from '@/constructors/Schedule/slot';
export default function ScheduleSlotCell({ day, slotNumber }) {
    //global stuff 
    const { stagingSchedule, setStagingSchedule, schedule } = useScheduleStore();
    const slot = stagingSchedule?.[day]?.find(s => s.slot === slotNumber);
    //local states
    const [subject, setSubject] = useState(slot?.subject || '');
    const [room, setRoom] = useState(slot?.room || '');
    const [type, setType] = useState(slot?.type || '');
    //render the slot with different colors
    const isTheory = slot?.type === 'theory';
    const bgColor = slot
        ? isTheory
            ? 'bg-violet-100 border-violet-400'
            : 'bg-blue-100 border-violet-400'
        : 'bg-white';
    //adding changes to local stagedSchedule
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const slotToAdd = new Slot(slotNumber, subject, room, type, schedule.name);
            const LocalSchedule = structuredClone(stagingSchedule);
            if (!slot) {
                if (!LocalSchedule[day]) LocalSchedule[day] = [];
                LocalSchedule[day].push(slotToAdd);
                setStagingSchedule(LocalSchedule);
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`${bgColor} hover:cursor-pointer hover:scale-102 transition-transform p-1 border border-gray-300 rounded flex flex-col justify-center items-center min-h-[70px] text-center`}
                >
                    {slot ? (
                        <>
                            <span className="text-sm text-secondary-foreground leading-tight">
                                {slot.subject}
                            </span>
                            <span className="text-xs text-muted-foreground">{slot.type}</span>
                            <span className="text-xs text-muted-foreground">{slot.room}</span>
                        </>
                    ) : (
                        <span className="text-xs text-gray-400 italic">No Class</span>
                    )}
                </div>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Slot</DialogTitle>
                        <DialogDescription>
                            Make changes to the slot. Ensure correct spellings.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='my-2 gap-2 flex flex-col'>
                        <Label htmlFor="subjectName">Subject Name</Label>
                        <Input
                            id="subjectName"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Add Subject"
                        />
                    </div>
                    <div className='my-2 gap-2 flex flex-col'>
                        <Label htmlFor="classroom">Classroom</Label>
                        <Input
                            id="classroom"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            placeholder="Add Classroom"
                        />
                    </div>
                    <div className='my-2 gap-2 flex flex-col'>
                        <Label htmlFor="subjectType">Type (theory/lab)</Label>
                        <Input
                            id="subjectType"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="theory / lab"
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Save Changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
