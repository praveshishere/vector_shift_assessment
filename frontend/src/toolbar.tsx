// toolbar.tsx

import React from "react";
import { DraggableNode } from "./draggableNode";

export const PipelineToolbar: React.FC = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 bg-gray-100 py-4 px-6 rounded-sm rounded-bl-xl rounded-br-xl shadow-sm border border-gray-200/60">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="file" label="File" />
      </div>
    </div>
  );
};
