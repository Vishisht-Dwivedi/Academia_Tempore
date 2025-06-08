import React from 'react';

export default function ScheduleSlotCell({ slot }) {
    const isTheory = slot?.type === 'theory';
    const bgColor = slot
        ? isTheory
            ? 'bg-violet-100 border-violet-400'
            : 'bg-blue-100 border-violet-400'
        : 'bg-white';

    return (
        <div
            className={`${bgColor} p-1 border border-gray-300 rounded flex flex-col justify-center items-center min-h-[70px] text-center`}
        >
            {slot ? (
                <>
                    <span className="text-sm text-secondary-foreground leading-tight">
                        {slot.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">{slot.room}</span>
                </>
            ) : (
                <span className="text-xs text-gray-400 italic">No Class</span>
            )}
        </div>
    );
}
