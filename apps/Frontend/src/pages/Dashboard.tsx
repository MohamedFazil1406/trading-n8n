import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListWorkflows, type Workflow } from "@/lib/https";

export default function Dashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    async function load() {
      const data = await apiListWorkflows();
      setWorkflows(data);
    }

    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Workflows</h1>

        <Link
          to="/create-workflow"
          className="px-4 py-2 rounded bg-black text-white"
        >
          Create Workflow
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {workflows.map((workflow) => (
          <Link
            key={workflow._id}
            to={`/workflow/${workflow._id}`}
            className="block border rounded p-4"
          >
            Workflow {workflow._id}
          </Link>
        ))}
      </div>
    </div>
  );
}
