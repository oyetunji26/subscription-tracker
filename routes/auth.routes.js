import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => res.send({ title: "SIGN up" }));
authRouter.post("/sign-in", (req, res) => res.send({ title: "SIGN in" }));
authRouter.post("/sign-out", (req, res) => res.send({ title: "SIGN out" }));

export default authRouter;
