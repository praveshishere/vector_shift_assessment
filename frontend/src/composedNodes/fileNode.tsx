import { Position, NodeProps } from "reactflow";
import { Node } from "./Node";
import { useState } from "react";
import { NodeData } from "../store";

interface FileNodeData extends NodeData {}

export const FileNode: React.FC<NodeProps<FileNodeData>> = ({ id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFile(files ? files[0] : null);
    if (files && files[0]) {
      setHasError(false);
      setErrorMessage("");
    } else {
      setHasError(true);
      setErrorMessage("Please select a file");
    }
  };

  return (
    <div>
      <Node
        handles={[{ id, type: "source", position: Position.Right }]}
        title="File"
        id={id}
      >
        <Node.Body>
          <label className="grid grid-cols-1 gap-1 text-sm mt-2">
            File
            <input
              type="file"
              onChange={handleTypeChange}
              className="w-full m-0 outline-2  outline-gray-200 rounded-sm text-xs py-1 px-1"
            />
            <span className="text-xs text-gray-500">
              {file && <p>Selected: {file.name}</p>}
            </span>
          </label>
        </Node.Body>
      </Node>
      {hasError ? <div className="text-red-500">{errorMessage}</div> : null}
    </div>
  );
};
