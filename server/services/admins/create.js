import AdminModel from "../../models/Admins.js";
import { adminSchema } from "../../../lib/validations/admin.js";
/**
 * Creates a new admin if one doesn't already exist with the same code.
 *
 * @param {Object} admin - Validated admin object.
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export default async function createAdmin(admin) {
    try {
        const validatedAdmin = adminSchema.parse(admin);
        const existingAdmin = await AdminModel.findOne({ code: validatedAdmin.code });
        if (existingAdmin) {
            throw new Error(`Admin with code: ${validatedAdmin.code} already exists`);
        }

        const savedAdmin = await new AdminModel(validatedAdmin).save();
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
