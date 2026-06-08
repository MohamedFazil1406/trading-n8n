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
import type { PriceTriggerNodeData, TimerNodeData } from "common/types";
import { Input } from "@/components/ui/input";
import { SUPPORTED_ASSETS } from "common/types";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer-trigger",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description:
      "Runs whenever the price goes above or below a certain number for an asset",
  },
];

type NodeKind =
  | "timer-trigger"
  | "price-trigger"
  | "hyperliquid"
  | "backpack"
  | "lighter";
type NodeMetadata = any;

export function TriggerSheet({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) {
  const [metadata, setMetadata] = useState<
    PriceTriggerNodeData | TimerNodeData
  >({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(
    SUPPORTED_TRIGGERS[0].id as NodeKind,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Choose a trigger to add to your workflow.
            <Select
              onValueChange={(value) => setSelectedTrigger(value as NodeKind)}
              value={selectedTrigger}
            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select a trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <SelectItem
                      onSelect={() => {
                        setSelectedTrigger(id as NodeKind);
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
            {selectedTrigger === "timer-trigger" && (
              <div>
                Numbers of seconds after ewhich the trigger should run:
                <Input
                  value={metadata.time}
                  type="text"
                  onChange={(e) =>
                    setMetadata({
                      ...metadata,
                      time: Number(e.target.value),
                    })
                  }
                />
              </div>
            )}
            {selectedTrigger === "price-trigger" && (
              <div>
                Price:
                <Input
                  type="text"
                  onChange={(e) =>
                    setMetadata({
                      ...metadata,
                      price: Number(e.target.value),
                    })
                  }
                />
                Asset:
                <Select
                  value={metadata.asset}
                  onValueChange={(value) =>
                    setMetadata({ ...metadata, asset: value })
                  }
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a asset" />
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
              </div>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() => onSelect(selectedTrigger, metadata)}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
