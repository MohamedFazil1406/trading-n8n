import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { TriggerSheet } from "@/components/TriggerSheet";
import { ActionSheet } from "@/components/ActionSheet";

import { PriceTrigger } from "@/nodes/triggers/PriceTrigger";
import { Timer } from "@/nodes/triggers/Timer";

import { Backpack } from "@/nodes/actions/Backpack";
import { Hyperliquid } from "@/nodes/actions/HyperLiquid";
import { Lighter } from "@/nodes/actions/Lighter";

import { apiCreateWorkflow, apiUpdateWorkflow } from "@/lib/https";

import type {
  PriceTriggerNodeData,
  TimerNodeData,
  TradingMetadata,
} from "common/types";

const nodeTypes = {
  "timer-trigger": Timer,
  "price-trigger": PriceTrigger,
  lighter: Lighter,
  hyperliquid: Hyperliquid,
  backpack: Backpack,
};

type NodeKind =
  | "timer-trigger"
  | "price-trigger"
  | "hyperliquid"
  | "backpack"
  | "lighter";

type NodeMetadata = PriceTriggerNodeData | TimerNodeData | TradingMetadata;

interface WorkflowNode {
  id: string;
  nodeId: string;
  position: {
    x: number;
    y: number;
  };
  type: NodeKind;
  data: {
    kind: "ACTION" | "TRIGGER";
    metadata: NodeMetadata;
  };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const [selectedAction, setSelectedAction] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(
      (curr) => applyNodeChanges(changes, curr as any) as WorkflowNode[],
    );
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges(
      (curr) => applyEdgeChanges(changes, curr as any) as WorkflowEdge[],
    );
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((curr) => addEdge(connection, curr as any) as WorkflowEdge[]);
  }, []);

  const POSITION_OFFSET = 50;

  const onConnectEnd = useCallback((_event: any, connectionInfo: any) => {
    if (!connectionInfo?.isValid && connectionInfo?.fromNode) {
      setSelectedAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x: connectionInfo.from.x + POSITION_OFFSET,
          y: connectionInfo.from.y + POSITION_OFFSET,
        },
      });
    }
  }, []);

  async function saveWorkflow() {
    try {
      const payload = {
        nodes,
        edges,
      };

      console.log("Payload:", payload);

      if (!workflowId) {
        const res = await apiCreateWorkflow(payload);

        setWorkflowId(res.id);

        alert(`Workflow Created: ${res.id}`);
      } else {
        await apiUpdateWorkflow(workflowId, payload);

        alert("Workflow Updated");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save workflow");
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={saveWorkflow}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Save Workflow
        </button>
      </div>

      {nodes.length === 0 && (
        <TriggerSheet
          onSelect={(type, metadata) => {
            setNodes([
              {
                id: "1",
                nodeId: "6a262bc1ffdabfe7114281a3",
                position: {
                  x: 100,
                  y: 100,
                },
                type,
                data: {
                  kind: "TRIGGER",
                  metadata,
                },
              },
            ]);
          }}
        />
      )}

      {selectedAction && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const newNodeId = `${nodes.length + 1}`;

            setNodes((curr) => [
              ...curr,
              {
                id: newNodeId,
                nodeId: "6a262bc1ffdabfe7114281a3",
                position: selectedAction.position,
                type,
                data: {
                  kind: "ACTION",
                  metadata,
                },
              },
            ]);

            setEdges((curr) => [
              ...curr,
              {
                id: `${selectedAction.startingNodeId}-${newNodeId}`,
                source: selectedAction.startingNodeId,
                target: newNodeId,
              },
            ]);

            setSelectedAction(null);
          }}
        />
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}
