// submit.tsx

import React, { useState } from "react";
import { useStore } from "./store";
import { ofetch } from "ofetch";
import { PipelineResultAlert } from "./components/PipelineResultAlert";

interface PipelineResponse {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

export const SubmitButton: React.FC = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [pipelineResult, setPipelineResult] = useState<PipelineResponse | null>(
    null
  );

  const submitGraph = async () => {
    const payload = {
      nodeIds: nodes.map((node) => node.id),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        id: edge.id,
      })),
    };

    const response = await ofetch<PipelineResponse>("/api/pipelines/parse", {
      method: "POST",
      body: payload,
    });

    setPipelineResult(response);
  };

  return (
    <>
      {pipelineResult && (
        <PipelineResultAlert
          numNodes={pipelineResult.num_nodes}
          numEdges={pipelineResult.num_edges}
          isDag={pipelineResult.is_dag}
          onClose={() => setPipelineResult(null)}
        />
      )}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={submitGraph}
          className="px-4.5 py-1.5 bg-gray-900 text-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-700 transition-colors duration-200 shadow-sm w-fit"
        >
          Submit
        </button>
      </div>
    </>
  );
};
