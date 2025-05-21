import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Paper,
    Typography,
} from '@mui/material';

const Schedule = ({ data, setScheduleData, setShowSchedule, setSelected, setChoice }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const lectureTimes = [9, 10, 11, 12, 13, 14, 15, 16];

    const back = () => {
        setScheduleData(null);
        setShowSchedule(false);
        setSelected(false);
        setChoice(false);
    };

    const CELL_SIZE = 100;

    return (
        <Box
            sx={{
                width: '100%',
                overflowX: 'auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper elevation={4} sx={{ minWidth: CELL_SIZE * 9 }}>
                <Table
                    stickyHeader
                    sx={{
                        tableLayout: 'fixed',
                        minWidth: CELL_SIZE * 9,
                        borderCollapse: 'collapse',
                    }}
                    aria-label="schedule table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                    fontWeight: 'bold',
                                    bgcolor: '#e0e0e0',
                                    border: '1px solid #ccc',
                                }}
                            >
                                Day / Time
                            </TableCell>
                            {lectureTimes.map((time) => (
                                <TableCell
                                    key={time}
                                    align="center"
                                    sx={{
                                        width: CELL_SIZE,
                                        height: CELL_SIZE,
                                        fontWeight: 'bold',
                                        bgcolor: '#e0e0e0',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    {time}:30
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {days.map((day) => {
                            const scheduledDay = data[day] || {};
                            return (
                                <TableRow key={day} sx={{ height: CELL_SIZE }}>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            bgcolor: '#bbdefb',
                                            border: '1px solid #ccc',
                                            width: CELL_SIZE,
                                            height: CELL_SIZE,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {day}
                                    </TableCell>
                                    {lectureTimes.map((_, index) => {
                                        const slotIndex = (index + 1).toString();
                                        const classHere = scheduledDay[slotIndex];

                                        return (
                                            <TableCell
                                                key={`${day}-${slotIndex}`}
                                                align="center"
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    width: CELL_SIZE,
                                                    height: CELL_SIZE,
                                                    padding: '8px',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                {classHere ? (
                                                    <>
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            {classHere.subjectCode}
                                                        </Typography>
                                                        <Typography variant="body2">{classHere.subjectType}</Typography>
                                                        <Typography variant="body2">{classHere.room}</Typography>
                                                    </>
                                                ) : null}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                variant="contained"
                color="success"
                sx={{ mt: 4, px: 4, py: 2 }}
                onClick={back}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default Schedule;
