import express from "express";
import getRouter from "./get.js";
import putRouter from './put.js'
const router = express.Router();

router.use("/", getRouter);
router.use("/", putRouter);

export default router;