import express from "express";
import getRouter from "./get.js";
import postRouter from "./post.js"
const router = express.Router();

router.use("/", getRouter);
router.use("/", postRouter);

export default router;