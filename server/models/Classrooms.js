import mongoose from "mongoose";
import ScheduleSchema from "./Schedule.js";

const Schema = mongoose.Schema;

const ClassroomsSchema = new Schema({
    room: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    schedule: {
        Monday: { type: ScheduleSchema, default: {} },
        Tuesday: { type: ScheduleSchema, default: {} },
        Wednesday: { type: ScheduleSchema, default: {} },
        Thursday: { type: ScheduleSchema, default: {} },
        Friday: { type: ScheduleSchema, default: {} },
    },
});

const ClassroomsModel = mongoose.model("Classroom", ClassroomsSchema);
export default ClassroomsModel;
