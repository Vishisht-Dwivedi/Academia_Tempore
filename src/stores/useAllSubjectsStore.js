import { create } from 'zustand';

const useAllSubjectsStore = create((set) => ({
    subjects: null,
    setSubjects: (subjectArray) => set({ subjects: subjectArray })
}));

export default useAllSubjectsStore;
