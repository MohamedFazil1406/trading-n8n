import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import {
  ExecutionModel,
  NodesModel,
  UserModel,
  WorkflowModel,
} from "db/clients";
import {
  SignUpSchema,
  SignInSchema,
  CreateWorkFlowSchema,
  UpdateWorkFlowSchema,
} from "common/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import cors from "cors";

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { success, data } = SignUpSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      msg: "Incorrect Inputs",
    });
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = (await UserModel.create({
      username: data.username,
      password: hashPassword,
    })) as { _id: string };
    res.status(201).json({
      id: user._id,
    });
    return;
  } catch (e) {
    res.status(411).json({
      msg: "USername already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { success, data } = SignInSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      msg: "Incorrect Inputs",
    });
    return;
  }
  try {
    const user = (await UserModel.findOne({
      username: data.username,
    })) as { _id: string; password: string } | null;
    if (!user) {
      res.status(403).json({
        msg: "User not found",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      res.status(403).json({
        msg: "Incorrect password",
      });
      return;
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY!,
    );
    res.status(200).json({
      id: user._id,
      token,
    });
  } catch (e) {
    res.status(411).json({
      msg: "Error during sign in",
    });
  }
});

app.post("/workflow", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const result = CreateWorkFlowSchema.safeParse(req.body);

  if (!result.success) {
    console.log("the errror", result.error.issues[0]!.message);
    res.status(403).json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const workflow = (await WorkflowModel.create({
      userId,
      nodes: result.data.nodes,
      edges: result.data.edges,
    })) as { _id: string };
    res.json({
      id: workflow._id,
    });
  } catch (e: any) {
    console.error("CREATE WORKFLOW ERROR:", e);

    res.status(500).json({
      msg: "Error creating workflow",
    });
  }
});

app.put("/workflow/:workflowId", authMiddleware, async (req, res) => {
  const { success, data } = UpdateWorkFlowSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      msg: "Incorrects Inputs",
    });
    return;
  }

  try {
    const workflow = await WorkflowModel.findByIdAndUpdate(
      req.params.workflowId,
      data,
      { new: true },
    );
    if (!workflow) {
      res.status(404).json({
        msg: "Workflow Not found",
      });
      return;
    }
    res.json({
      id: workflow._id,
    });
  } catch (e) {
    res.status(411).json({
      msg: "Failed to update the workflow",
    });
  }
});

app.get("/workflow/:workflowId", authMiddleware, async (req, res) => {
  const workflow = await WorkflowModel.findById(req.params.workflowId);
  if (!workflow || workflow.userId.toString() !== req.userId) {
    res.status(404).json({
      msg: "Workflow not found",
    });
    return;
  }

  res.json(workflow);
});

app.get("/workflows", authMiddleware, async (req, res) => {
  const workflow = await WorkflowModel.find({ userId: req.userId });
  res.json(workflow);
});

app.get("/workflow/execution/:workflowId", authMiddleware, async (req, res) => {
  const execution = await ExecutionModel.find({
    workflowId: req.params.workflowId,
  });
  res.json(execution);
});

app.get("/nodes", async (req, res) => {
  const nodes = await NodesModel.find();
  res.json(nodes);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
