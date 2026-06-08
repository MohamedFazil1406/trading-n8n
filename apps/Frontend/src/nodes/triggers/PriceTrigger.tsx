import { Position, Handle } from "@xyflow/react";
import type { PriceTriggerNodeData } from "common/types";

export function PriceTrigger({
  data,
  isConnectable,
}: {
  data: {
    metadata: PriceTriggerNodeData;
  };
  isConnectable: boolean;
}) {
  return (
    <div className="p-2 border rounded-md bg-white shadow-md">
      <div className="font-bold  text-center">Price Trigger</div>
      <div className="text-gray-600 text-sm">
        {data.metadata.asset} - {data.metadata.price}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
