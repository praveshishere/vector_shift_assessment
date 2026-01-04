import { Position, NodeProps } from "reactflow";
import { Node } from "./Node";
import { useState } from "react";
import { NodeData } from "../store";

interface TextNodeProps extends NodeData {
  text?: string;
}

export const TextNode: React.FC<NodeProps<TextNodeProps>> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value);
  };

  return (
    <Node
      handles={[{ id, type: "source", position: Position.Right }]}
      title="Text"
      id={id}
    >
      <Node.Body>
        <label className="grid grid-cols-1 gap-1 text-sm mt-2">
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
            className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1"
          />
        </label>
      </Node.Body>
    </Node>
  );
};
