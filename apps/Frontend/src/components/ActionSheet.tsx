import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { TradingMetadata } from "common/types";
import { SUPPORTED_ASSETS } from "common/types";
import { Input } from "@/components/ui/input";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyperliquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on Backpack",
  },
];

type NodeKind =
  | "timer-trigger"
  | "price-trigger"
  | "hyperliquid"
  | "backpack"
  | "lighter";
export type NodeMetadata = TradingMetadata;

export function ActionSheet({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) {
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
  const [selectedAction, setSelectedAction] = useState<NodeKind>(
    SUPPORTED_ACTIONS[0].id as NodeKind,
  );

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Choose an action to add to your workflow.
            <Select
              onValueChange={(value) => setSelectedAction(value as NodeKind)}
              value={selectedAction}
            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
                    <SelectItem
                      onSelect={() => {
                        setSelectedAction(id as NodeKind);
                      }}
                      key={id}
                      value={id}
                    >
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {(selectedAction === "hyperliquid" ||
              selectedAction === "lighter" ||
              selectedAction === "backpack") && (
              <div>
                <div className="pt-4">Type</div>
                <Select
                  value={metadata.type}
                  onValueChange={(value) =>
                    setMetadata({ ...metadata, type: value })
                  }
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="long">LONG</SelectItem>
                      <SelectItem value="short">SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">Symbol</div>
                <Select
                  value={metadata.symbol}
                  onValueChange={(value) =>
                    setMetadata({ ...metadata, symbol: value })
                  }
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a Symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <SelectItem key={id} value={id}>
                          {id}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">QTY</div>

                <Input
                  value={metadata.qty}
                  type="text"
                  onChange={(e) =>
                    setMetadata({
                      ...metadata,
                      qty: Number(e.target.value),
                    })
                  }
                />
              </div>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() =>
              onSelect(selectedAction, metadata as TradingMetadata)
            }
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
