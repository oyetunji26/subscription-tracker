import { workflowClient } from "../config/upstash.js";
import Subscription from "../model/subscription.model.js";
import { SERVER_URL } from "../config/env.js";
import dayjs from "dayjs";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId },
    });
  } catch (error) {
    console.log(`Error creating subscription : ${error}`);
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const subscription = await Subscription.findById(req.params.id);

    console.log(subscription);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error(
        "You are not authorized to delete this subscription"
      );
      error.status = 403;
      throw error;
    }

    await subscription.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error(
        "You are not authorized to cancel this subscription"
      );
      error.status = 403;
      throw error;
    }

    subscription.status = "cancelled";
    // subscription.cancelledAt = new Date();
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewal = async (req, res, next) => {
  try {
    const in7days = dayjs().add(7, "day").toISOString();
    console.log(in7days);
    const subscriptions = await Subscription.find({
      user: req.user.id,
      status: "active",
      renewalDate: { $gte: dayjs(), $lte: in7days },
    });
    console.log(subscriptions);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error(
        "You are not authorized to cancel this subscription"
      );
      error.status = 403;
      throw error;
    }

    Object.keys(req.body).forEach((key) => {
      subscription[key] = req.body[key];
    });

    const updateSubscription = await subscription.save();

    res.status(200).json({
      success: true,
      data: updateSubscription,
    });
  } catch (error) {
    next(error);
  }
};
