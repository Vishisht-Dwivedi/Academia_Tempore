import { authenticateTeacher } from "../services/teacher/read.js";
import generatePayload from "../services/auth/generatePayload.js";

export const teacherController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Missing credentials");
    }

    try {
        const teacherData = await authenticateTeacher(email, password);
        if (!teacherData.user) {
            return res.redirect("/login/teacher");
        }

        const payload = {
            authScope: "teacher",
            ...teacherData
        };

        const token = generatePayload(payload);
        res.cookie("user", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.redirect("/dashboard");
    } catch (error) {
        console.error("Teacher login failed:", error);
        return res.status(500).send("Internal Server Error");
    }
};
