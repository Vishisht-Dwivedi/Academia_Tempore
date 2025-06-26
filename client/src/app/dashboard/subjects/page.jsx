"use client"
import { useEffect, useState } from "react"
import AllSubjectsCard from "@/components/subjects/AllSubjects"
import AddSubjectCard from "@/components/subjects/AddCard"
import { fetchAllSubjects } from "@/utils/getAllSubjects";
export default function Page() {
    const [allSubjects, setAllSubjects] = useState(null);
    const [allSubjectsLoading, setAllSubjectsLoading] = useState(true);
    useEffect(() => {
        fetchAllSubjects()
            .then(res => {
                setAllSubjects(res);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setAllSubjectsLoading(false);
            })
    }, []);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-wider text-balance text-indigo-600">
                Manage Subjects
            </h1>
            <p className="text-center text-l font-medium tracking-wide text-indigo-400 mt-2">
                View, Add and Delete Subjects
            </p>
            <div className="flex gap-3 mt-3 w-3/4">
                <AddSubjectCard />
                <AllSubjectsCard elementArray={allSubjects} state={allSubjectsLoading} />
            </div>
        </div>
    )
}