import { Position, Handle } from "@xyflow/react";
import type { TimerNodeData } from "common/types";

export function Timer({
  data,
  isConnectable,
}: {
  data: {
    metadata: TimerNodeData;
  };
  isConnectable: boolean;
}) {
  return (
    <div className="p-2 border rounded-md bg-white shadow-md">
      <div className="font-bold">Timer</div>

      <div className="flex items-center gap-1">
        Every <div className="font-bold">{data.metadata.time}</div> seconds
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}
