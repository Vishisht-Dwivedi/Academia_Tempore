"use client"
import { useEffect, useState } from "react"
import { fetchAllClassrooms } from "@/utils/getAllClassrooms"
import AllClassroomsCard from "@/components/classrooms/AllClassrooms"
import AddClassroomCard from "@/components/classrooms/AddCard"
export default function Page() {
    const [allRooms, setAllRooms] = useState(null);
    const [allRoomsLoading, setAllRoomsLoading] = useState(true);
    useEffect(() => {
        fetchAllClassrooms()
            .then(res => {
                setAllRooms(res);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setAllRoomsLoading(false);
            })
    }, []);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                Manage Classrooms
            </h1>
            <p className="text-center text-l font-medium tracking-wide text-indigo-400 mt-2">
                View, Add, Delete and Update Classrooms and their schedules
            </p>
            <div className="flex gap-3 mt-3 w-3/4">
                <AddClassroomCard />
                <AllClassroomsCard elementArray={allRooms} state={allRoomsLoading} />
            </div>
        </div>
    )
}