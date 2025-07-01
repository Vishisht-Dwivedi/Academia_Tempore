import AdminModel from "../../models/Admins.js";
export default async function createAdmin(admin) {
    try {
        const existingAdmin = await AdminModel.findOne({
            code: admin.code
        })

        if (existingAdmin) {
            throw new Error(`Admin with code : ${admin.code} already exists`);
        }

        const savedAdmin = await new AdminModel(admin).save();
        return {
            success: true,
            data: savedAdmin.toObject(),
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
}