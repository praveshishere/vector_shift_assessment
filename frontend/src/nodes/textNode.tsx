// textNode.tsx

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../store';

interface TextNodeData extends NodeData {
  text?: string;
}

export const TextNode: React.FC<NodeProps<TextNodeData>> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
