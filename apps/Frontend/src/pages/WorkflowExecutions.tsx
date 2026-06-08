import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiListExecutions } from "@/lib/https";

export default function WorkflowExecutions() {
  const { workflowId } = useParams();

  const [executions, setExecutions] = useState<any[]>([]);

  useEffect(() => {
    if (!workflowId) return;

    async function load() {
      const data = await apiListExecutions(workflowId as string);
      setExecutions(data);
    }

    load();
  }, [workflowId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Executions</h1>

      <pre className="mt-4">{JSON.stringify(executions, null, 2)}</pre>
    </div>
  );
}
