import './Schedule.css';

const Schedule = ({ data }) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const lectureTimes = [9, 10, 11, 12, 13, 14, 15, 16];

    return (
        <section className="schedule">

            <div className="schedule-container">
                {/* Header Row */}
                <div className="row header">
                    <div className="cell header-cell">Day / Time</div>
                    {lectureTimes.map((time) => (
                        <div key={time} className="cell header-cell">{time}:30</div>
                    ))}
                </div>

                {/* Daily Rows */}
                {days.map((day) => {
                    const scheduled = data[day] || [];

                    return (
                        <div key={day} className="row">
                            <div className="cell day-cell">{day}</div>
                            {lectureTimes.map((time) => {
                                const classHere = scheduled.find(cls => cls.time.includes(time));

                                return (
                                    <div key={`${day}-${time}`} className="cell">
                                        {classHere && (
                                            <div className={`class-box ${classHere.subjectType.toLowerCase()}`}>
                                                <div>{classHere.subjectCode}</div>
                                                <div>{classHere.room}</div>
                                                <div>{classHere.subjectType}</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <button type="button" className='back-btn-schedule'>Go Back</button>
        </section>
    );
};

export default Schedule;
