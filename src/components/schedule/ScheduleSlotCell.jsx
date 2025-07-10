'use client';
import React, { useState, useEffect } from 'react';
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

import useAllSubjectsStore from '@/stores/useAllSubjectsStore';
import useAllTeachersStore from '@/stores/useAllTeachersStore';
import useScheduleStore from '@/stores/useScheduleStore';
import { slotInputSchema } from '@/lib/validations/slot';

export default function ScheduleSlotCell({ inputSlot, roomOrTeacher, day, slotNumber }) {
    //global states
    const subjects = useAllSubjectsStore((state) => state.subjects) || [];
    const teachers = useAllTeachersStore((state) => state.teachers) || [];
    const { schedule, stagingSchedule, setStagingSchedule } = useScheduleStore();
    //local states
    const [slot, setSlot] = useState(structuredClone(inputSlot) || null);
    const [teacher, setTeacher] = useState(slot?.teacher || null);
    const [room, setRoom] = useState(slot?.room || schedule.room || null);
    // ensure teacher is set once teachers are available
    useEffect(() => {
        if (!teacher && teachers.length && schedule?.name) {
            const matched = teachers.find((t) => t.name === schedule.name);
            if (matched) {
                setTeacher(matched);
            }
        }
    }, [teachers, schedule?.name, teacher, stagingSchedule]);
    const [subject, setSubject] = useState(slot?.subject || null);
    //styling
    const isTheory = slot?.subject?.type === 'theory';
    const bgColor = slot
        ? isTheory
            ? 'bg-blue-100 border-violet-400'
            : 'bg-violet-100 border-violet-400'
        : 'bg-white';
    //submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();
        const input = {
            slot: slotNumber,
            teacher: {
                name: teacher.name,
                code: teacher.code,
                email: teacher.email
            },
            subject: {
                name: subject.name,
                code: subject.code,
                type: subject.type
            },
            room
        }
        const validated = slotInputSchema.safeParse(input);
        if (!validated.success) {
            alert(validated.error);
        } else {
            const updated = structuredClone(stagingSchedule);
            if (!updated[day]) updated[day] = [];
            const existingIndex = updated[day].findIndex(s => s.slot === slotNumber);
            if (existingIndex !== -1) {
                updated[day][existingIndex] = validated.data;
            } else {
                updated[day].push(validated.data);
            }
            setStagingSchedule(updated);
            setSlot(validated.data);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`${bgColor} hover:cursor-pointer hover:scale-102 transition-transform p-1 border border-gray-300 rounded flex flex-col justify-center items-center min-h-[70px] text-center`}
                >
                    {slot ? (
                        <>
                            <span className="text-sm text-secondary-foreground leading-tight">
                                {slot.subject.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{slot.subject.type}</span>
                            <span className="text-xs text-muted-foreground">
                                {roomOrTeacher === 'room' ? slot.teacher?.name : slot.room}
                            </span>
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
                            Select subject, type, room and teacher. These will be saved to staging.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Subject Dropdown */}
                    <div className='my-2 gap-2 flex flex-col'>
                        <Label htmlFor="subject">Subject</Label>
                        <select
                            id="subject"
                            className="border rounded px-2 py-1"
                            defaultValue=""
                            onChange={(e) => {
                                const selectedSubject = e.target.value?.split(":");
                                const [selectedCode, selectedType] = selectedSubject;
                                const fullSubject = subjects.find((s) => (s.code === selectedCode && s.type === selectedType));
                                setSubject(fullSubject);
                            }}
                        >
                            <option value="" disabled>Select Subject</option>
                            {subjects.map((s) => (
                                <option key={`${s.code}-${s.type}`} value={`${s.code}:${s.type}`}>
                                    {s.name} ({s.code}) - {s.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Classroom */}
                    {roomOrTeacher === "teacher" ? (
                        <div className='my-2 gap-2 flex flex-col'>
                            <Label htmlFor="classroom">Classroom</Label>
                            <Input
                                id="classroom"
                                defaultValue=""
                                placeholder="Add Classroom"
                                onChange={(e) => {
                                    setRoom(e.target.value)
                                }}
                            />
                        </div>
                    ) : (
                        <input type="hidden" id="classroom" value={slot?.room || ''} />
                    )}

                    {/* Teacher Dropdown */}
                    {roomOrTeacher === "room" && (
                        <div className='my-2 gap-2 flex flex-col'>
                            <Label htmlFor="teacher">Teacher</Label>
                            <select
                                id="teacher"
                                className="border rounded px-2 py-1"
                                value={teacher?.code || ""}
                                onChange={(e) => {
                                    const selectedCode = e.target.value;
                                    const selectedTeacher = teachers.find(t => t.code === selectedCode);
                                    setTeacher(selectedTeacher || null);
                                }}
                            >
                                <option value="" disabled>Select Teacher</option>
                                {teachers.map((t) => (
                                    <option key={t.code} value={t.code}>
                                        {t.name} ({t.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}


                    <DialogFooter>
                        {slot && (
                            <DialogClose asChild>
                                <Button variant="destructive">Delete</Button>
                            </DialogClose>
                        )}
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
