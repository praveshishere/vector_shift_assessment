// draggableNode.tsx

import React from 'react';

interface DraggableNodeProps {
  type: string;
  label: string;
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label }) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        className={`flex items-center py-4 w-20 justify-center cursor-grab rounded-sm ${type} border border-gray-200/60 bg-white shadow-md`}
        draggable
      >
          <span className='text-gray-900'>{label}</span>
      </div>
    );
  };
  