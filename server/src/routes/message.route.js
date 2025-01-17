import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSideBar,
  getMessagesByUserId,
  sendMessagesToUserId,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessagesByUserId);
router.post("/:id", protectRoute, sendMessagesToUserId);

export default router;
