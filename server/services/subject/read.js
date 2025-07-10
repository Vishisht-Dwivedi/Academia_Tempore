import SubjectModel from "../../models/Subjects.js";
import TeacherModel from "../../models/Teachers.js";
/**
 * Finds a subject using any filter (e.g., { _id }, { code, type }, etc.)
 * @param {Object} filter - Mongoose-compatible filter
 * @returns {Promise<Object>}
 */
export async function findSubject(filter) {
    const subject = await SubjectModel.findOne(filter).populate("teachers").lean();
    if (!subject) {
        throw new Error(`Subject not found for filter: ${JSON.stringify(filter)}`);
    }
    return subject;
}


/**
 * Returns all subjects (optionally with selected fields)
 * @param {{ select?: Object }} options
 * @returns {Promise<Array<Object>>}
 */
export async function getAllSubjects({ select = null } = {}) {
    let query = SubjectModel.find({}).populate("teachers").lean();
    if (select) query = query.select(select);
    return await query.lean();
}