import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "GEt all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "Get user derails" }));

userRouter.post("/", (req, res) => res.send({ title: "POST new user" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE User" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE User" }));

export default userRouter;
