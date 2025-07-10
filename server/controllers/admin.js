import getAdmin from "../services/admins/read.js";
import generatePayload from "../services/auth/generatePayload.js";

export const adminController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Missing credentials");
    }

    try {
        const adminData = await getAdmin(email, password);
        if (!adminData.user) {
            return res.redirect("/login/admin");
        }

        const payload = {
            authScope: "admin",
            ...adminData
        };

        const token = generatePayload(payload);
        res.cookie("user", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.redirect("/dashboard");
    } catch (error) {
        console.error("Admin login failed:", error);
        return res.status(500).send("Internal Server Error");
    }
};
