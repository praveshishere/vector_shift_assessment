// outputNode.tsx

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeData } from "../store";
import { Node } from "./Node";

interface OutputNodeData extends NodeData {
  outputName?: string;
  outputType?: string;
}

export const OutputNode: React.FC<NodeProps<OutputNodeData>> = ({
  id,
  data,
}) => {
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value);
  };

  return (
    <Node
      handles={[{ type: "target", position: Position.Left, id: `${id}-value` }]}
      id={id}
      title="Output"
    >
      <Node.Body>
        <label className="grid grid-cols-1 gap-1 text-sm mt-2">
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </Node.Body>
    </Node>
  );
};
