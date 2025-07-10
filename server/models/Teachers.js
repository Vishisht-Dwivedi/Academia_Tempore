import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        default: null,
    },
    password_hash: {
        type: String,
        default: null,
    },
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Classroom",
        },
    ],
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
}, { timestamps: true });

// Pre-save hook to generate email and password_hash
TeacherSchema.pre("save", async function (next) {
    if (!this.email && this.name) {
        const username = this.name.toLowerCase().replace(/\s+/g, "");
        this.email = `${username}@iiitbhopal.ac.in`;
    }

    if (!this.password_hash && this.code) {
        const saltRounds = 12;
        this.password_hash = await bcrypt.hash(this.code, saltRounds);
    }

    if (!this.email || !this.password_hash) {
        return next(new Error("Email or password could not be generated."));
    }

    next();
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;
