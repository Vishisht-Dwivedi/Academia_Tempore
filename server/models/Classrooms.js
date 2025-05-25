import mongoose from "mongoose";
import DayScheduleSchema from "./Schedule.js";

const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
    room: {
        type: String,
        required: true,
        unique: true
    },
    schedule: {
        type: [DayScheduleSchema],
        default: []
    }
});


const ClassroomModel = mongoose.model("Classroom", ClassroomSchema);
export default ClassroomModel;
