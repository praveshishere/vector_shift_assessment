import { Position, NodeProps } from "reactflow";
import { Node } from "./Node";
import { useState } from "react";
import { NodeData } from "../store";

interface InputNodeData extends NodeData {
  inputName: string;
  inputType: string;
}

export const InputNode: React.FC<NodeProps<InputNodeData>> = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
  };

  return (
    <Node
      handles={[{ id, type: "source", position: Position.Right }]}
      title="Input"
      id={id}
    >
      <Node.Body>
        <label className="grid grid-cols-1 gap-1 text-sm mt-2">
          Type
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </Node.Body>
    </Node>
  );
};
