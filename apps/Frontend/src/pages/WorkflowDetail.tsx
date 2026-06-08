import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { apiGetWorkflow, type Workflow } from "@/lib/https";

import { Timer } from "@/nodes/triggers/Timer";
import { PriceTrigger } from "@/nodes/triggers/PriceTrigger";

import { Backpack } from "@/nodes/actions/Backpack";
import { Hyperliquid } from "@/nodes/actions/HyperLiquid";
import { Lighter } from "@/nodes/actions/Lighter";

const nodeTypes = {
  "timer-trigger": Timer,
  "price-trigger": PriceTrigger,
  lighter: Lighter,
  hyperliquid: Hyperliquid,
  backpack: Backpack,
};

export default function WorkflowDetail() {
  const { workflowId } = useParams();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);

  useEffect(() => {
    if (!workflowId) return;

    async function load() {
      try {
        const data = await apiGetWorkflow(workflowId!);
        setWorkflow(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [workflowId]);

  if (!workflow) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Workflow Details</h1>

      <div className="mt-4">Nodes: {workflow.nodes.length}</div>

      <div>Edges: {workflow.edges.length}</div>

      <div className="mt-6 h-150 border rounded">
        <ReactFlow
          nodes={workflow.nodes as any}
          edges={workflow.edges as any}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>

      <Link
        to={`/workflow/${workflow._id}/executions`}
        className="inline-block mt-4 px-4 py-2 bg-black text-white rounded"
      >
        View Executions
      </Link>
    </div>
  );
}
