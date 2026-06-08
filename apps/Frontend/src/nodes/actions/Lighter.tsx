import { Handle } from "@xyflow/react";
import { Position } from "@xyflow/system";
import type { TradingMetadata } from "common/types";

export function Lighter({
  data,
}: {
  data: {
    metadata: TradingMetadata;
  };
}) {
  return (
    <div className="p-2 border rounded-md bg-white shadow-md">
      <div className="font-bold pb-2 text-center">Lighter Trade</div>
      <div className="flex items-center gap-1 text-gray-600 text-sm">
        Type:{" "}
        <div className="font-bold text-black text-sm">{data.metadata.type}</div>
      </div>
      <div className="flex items-center gap-1 text-gray-600 text-sm">
        QTY:{" "}
        <div className="font-bold text-black text-sm">{data.metadata.qty}</div>
      </div>
      <div className="flex items-center gap-1 text-gray-600 text-sm">
        Symbol:{" "}
        <div className="font-bold text-black text-sm">
          {data.metadata.symbol}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
