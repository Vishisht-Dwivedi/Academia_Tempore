import { create } from 'zustand';

const useScheduleStore = create((set) => ({
    schedule: null,
    stagingSchedule: null,
    setSchedule: (newSchedule) => set({ schedule: newSchedule }),
    setStagingSchedule: (newStaging) => set({ stagingSchedule: newStaging }),
    resetStaging: () => set((state) => ({ stagingSchedule: state.schedule })),
}));
export default useScheduleStore