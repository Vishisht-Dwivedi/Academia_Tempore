import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    isMaster: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
    if (!this.email && this.name) {
        const username = this.name.toLowerCase().replace(/\s+/g, "");
        this.email = `${username}@iiitbhopal.ac.in`;
    }

    if (!this.isModified("password_hash")) return next();

    const saltRounds = 12;
    this.password_hash = await bcrypt.hash(this.password_hash, saltRounds);
    next();
});

const AdminModel = mongoose.model("Admin", AdminSchema);
export default AdminModel;
