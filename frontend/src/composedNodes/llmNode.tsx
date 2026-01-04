// llmNode.tsx

import React from "react";
import { Position, NodeProps } from "reactflow";
import { NodeData } from "../store";
import { Node } from "./Node";

export const LLMNode: React.FC<NodeProps<NodeData>> = ({ id }) => {
  return (
    <Node
      handles={[
        {
          id: `${id}-response`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `${id}-system`,
          type: "target",
          position: Position.Left,
          style: { top: `${100 / 3}%` },
        },
        {
          id: `${id}-prompt`,
          type: "target",
          position: Position.Left,
          style: { top: `${200 / 3}%` },
        },
      ]}
      title="LLM"
      id={id}
    >
      <Node.Body>
        <div>
          <span>This is a LLM.</span>
        </div>
      </Node.Body>
    </Node>
  );
};
