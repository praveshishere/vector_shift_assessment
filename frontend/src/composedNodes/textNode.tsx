import { Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import { Node } from "./Node";
import { useEffect, useState } from "react";
import { NodeData, useStore } from "../store";
import AutoResizeInput from "../components/AutoResizableInput";

interface TextNodeProps extends NodeData {
  text?: string;
}

export const TextNode: React.FC<NodeProps<TextNodeProps>> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const [sourceNodeIds, setSourceNodeIds] = useState<string[]>([]);

  const nodes = useStore((state) => state.nodes);
  const connectNode = useStore((state) => state.connectNode);

  const nodeIds = nodes.map((node) => node.id);

  const handleTextChange = (value: string) => {
    setCurrText(value);

    const matches = Array.from(value.matchAll(/\{\{(.*?)\}\}/g)).map(
      (m) => m[1]
    );

    const updatedSourceIds = [...new Set(matches)].filter((match) =>
      nodeIds.includes(match)
    );

    if (JSON.stringify(updatedSourceIds) === JSON.stringify(sourceNodeIds))
      return;

    setSourceNodeIds(updatedSourceIds);
    updateNodeInternals(id);
  };

  type Handle = {
    id: string;
    type: "source" | "target";
    position: Position;
  };

  const targetHandles: Handle[] = sourceNodeIds.map((_, idx) => ({
    id: `handle_target_${idx}`,
    type: "target",
    position: Position.Left,
  }));

  // Connect edges when source references are updated
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);

    // Wait for React Flow to process the handle updates before creating edges
    setTimeout(() => {
      sourceNodeIds.forEach((sourceId, idx) => {
        connectNode({
          source: {
            nodeId: sourceId,
            handleId: null,
          },
          target: {
            nodeId: id,
            handleId: `handle_target_${idx}`,
          },
        });
      });
    }, 0);
  }, [sourceNodeIds, id, updateNodeInternals, connectNode]);

  // Remove old edges references are removed
  const edges = useStore((state) => state.edges);
  const onEdgesChange = useStore((state) => state.onEdgesChange);

  useEffect(() => {
    const idleEdges = edges
      .filter((edge) => {
        return edge.target === id;
      })
      .map((edge) => ({
        type: "remove" as "remove",
        id: edge.id,
      }));
    if (idleEdges.length) {
      onEdgesChange(idleEdges);
    }
  }, [sourceNodeIds]);

  return (
    <Node
      handles={[
        {
          id,
          type: "source",
          position: Position.Right,
        },
        ...targetHandles,
      ]}
      title="Text"
      id={id}
      className="w-fit"
      description="Accept Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes"
    >
      <Node.Body className="overflow-visible container">
        <label className="grid grid-cols-1 gap-1 text-sm mt-2">
          Text:
          <AutoResizeInput
            value={currText}
            onChange={handleTextChange}
            className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1 overflow-visible"
          />
        </label>
      </Node.Body>
    </Node>
  );
};
