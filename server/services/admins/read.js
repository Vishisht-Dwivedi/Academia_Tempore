import AdminModel from "../../models/Admins.js";
import bcrypt from "bcrypt";
export default async function getAdmin(email, password) {
    const admin = await AdminModel.findOne({ email });
    if (!admin) return { user: false };
    const verified = await bcrypt.compare(password, admin.password_hash);
    if (!verified) return { user: false };
    return { user: admin.name, email: admin.email, isMaster: admin.isMaster }
}