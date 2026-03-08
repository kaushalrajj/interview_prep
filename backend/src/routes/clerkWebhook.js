// backend/src/routes/clerkWebhook.js
import express from "express";
import { Webhook } from "svix";
import { inngest } from "../lib/inngest.js";

const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    if (evt.type === "user.created") {
      await inngest.send({ name: "clerk/user.created", data: evt.data });
    }

    if (evt.type === "user.deleted") {
      await inngest.send({ name: "clerk/user.deleted", data: evt.data });
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;