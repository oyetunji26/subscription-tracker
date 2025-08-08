import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";

import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getUserSubscriptions,
  getUpcomingRenewal,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subRouter = Router();

subRouter.get("/", (req, res) => res.send({ title: "GET all subscriptions" }));
// subRouter.get("/:id", (req, res) =>
//   res.send({ title: "GET subscription details" })
// );
subRouter.post("/", authorize, createSubscription);
subRouter.patch("/:id", authorize, updateSubscription);
subRouter.delete("/:id", authorize, deleteSubscription);
subRouter.get("/user/:id", authorize, getUserSubscriptions);
subRouter.put("/:id/cancel", authorize, cancelSubscription);

subRouter.get("/upcoming-renewals", authorize, getUpcomingRenewal);

export default subRouter;
