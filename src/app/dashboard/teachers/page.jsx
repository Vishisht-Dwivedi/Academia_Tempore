"use client"
import { useEffect, useState } from "react"
import { fetchAllTeachers } from "@/utils/getAllTeachers"
import AllTeachersCard from "@/components/teachers/AllTeachers"
import AddTeacherCard from "@/components/teachers/AddCard";
export default function Page() {
    const [allTeachers, setAllTeachers] = useState(null);
    const [allTeachersLoading, setAllTeachersLoading] = useState(true);
    useEffect(() => {
        fetchAllTeachers()
            .then(res => {
                setAllTeachers(res);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setAllTeachersLoading(false);
            })
    }, []);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                Manage Teachers
            </h1>
            <p className="text-center text-l font-medium tracking-wide text-indigo-400 mt-2">
                View, Add, Delete and Update Teachers and their Schedule
            </p>
            <div className="flex gap-3 mt-3 w-3/4">
                <AddTeacherCard />
                <AllTeachersCard elementArray={allTeachers} state={allTeachersLoading} />
            </div>
        </div>
    )
}