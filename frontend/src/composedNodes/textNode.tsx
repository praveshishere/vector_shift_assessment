import { Position, NodeProps } from "reactflow";
import { Node } from "./Node";
import { useState } from "react";
import { NodeData } from "../store";
import AutoResizeInput from "../components/AutoResizableInput";

interface TextNodeProps extends NodeData {
  text?: string;
}

export const TextNode: React.FC<NodeProps<TextNodeProps>> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  return (
    <Node
      handles={[{ id, type: "source", position: Position.Right }]}
      title="Text"
      id={id}
      className="w-fit"
    >
      <Node.Body className="overflow-visible container">
        <label className="grid grid-cols-1 gap-1 text-sm mt-2">
          Text:
          <AutoResizeInput
            value={currText}
            onChange={setCurrText}
            className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1 overflow-visible"
          />
        </label>
      </Node.Body>
    </Node>
  );
};
