// submit.tsx

import React from "react";
import { useStore } from "./store";
import { ofetch } from "ofetch";

export const SubmitButton: React.FC = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const submitGraph = async () => {
    const payload = {
      nodeIds: nodes.map((node) => node.id),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        id: edge.id,
      })),
    };

    const response = await ofetch("/api/pipelines/parse", {
      method: "POST",
      body: payload,
    });

    console.log(response);
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={submitGraph}
        className="px-4.5 py-1.5 bg-gray-900 text-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-700 transition-colors duration-200 shadow-sm w-fit"
      >
        Submit
      </button>
    </div>
  );
};
