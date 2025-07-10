import { create } from 'zustand';

const useAllTeachersStore = create((set) => ({
    teachers: null,
    setTeachers: (teacherArray) => set({ teachers: teacherArray })
}));
export default useAllTeachersStore