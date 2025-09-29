import { getMessages, getUsersForSidebar, markMessagesAsSeen, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

import express from "express";

const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUsersForSidebar)
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen)
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;