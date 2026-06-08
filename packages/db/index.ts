import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const EdgeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const PositionSchema = new mongoose.Schema(
  {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const NodeDataSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["ACTION", "TRIGGER"] },
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    _id: false,
  },
);

const WorkFlowNodeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nodeId: {
      type: mongoose.Types.ObjectId,
      ref: "Nodes",
    },
    data: NodeDataSchema,
    position: PositionSchema,
    credentials: mongoose.Schema.Types.Mixed,
  },
  {
    _id: false,
  },
);

const WorkflowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  nodes: [WorkFlowNodeSchema],
  edges: [EdgeSchema],
});

const CredentialsTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
});

const NodesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["ACTION", "TRIGGER"],
    required: true,
  },
  credentialType: [CredentialsTypeSchema],
});

const ExecutionSchema = new mongoose.Schema({
  workflowId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Workflows",
  },
  status: {
    type: String,
    enum: ["PENDING", "RUNNING", "COMPLETED", "FAILED"],
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  completedAt: {
    type: Date,
  },
});

export const UserModel = mongoose.model("Users", UserSchema);
export const WorkflowModel = mongoose.model("Workflows", WorkflowSchema);
export const ExecutionModel = mongoose.model("Executions", ExecutionSchema);
export const NodesModel = mongoose.model("Nodes", NodesSchema);
