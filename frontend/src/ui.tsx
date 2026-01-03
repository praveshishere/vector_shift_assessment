// ui.tsx
// Displays the drag-and-drop UI
// --------------------------------------------------

import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, ReactFlowInstance, NodeTypes, ConnectionLineType } from 'reactflow';
import { useStore, NodeData } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes: NodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};



export const PipelineUI: React.FC = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    
    const nodesSelector = useCallback((state: any) => state.nodes, []);
    const edgesSelector = useCallback((state: any) => state.edges, []);
    const getNodeIDSelector = useCallback((state: any) => state.getNodeID, []);
    const addNodeSelector = useCallback((state: any) => state.addNode, []);
    const onNodesChangeSelector = useCallback((state: any) => state.onNodesChange, []);
    const onEdgesChangeSelector = useCallback((state: any) => state.onEdgesChange, []);
    const onConnectSelector = useCallback((state: any) => state.onConnect, []);
    
    const nodes = useStore(nodesSelector);
    const edges = useStore(edgesSelector);
    const getNodeID = useStore(getNodeIDSelector);
    const addNode = useStore(addNodeSelector);
    const onNodesChange = useStore(onNodesChangeSelector);
    const onEdgesChange = useStore(onEdgesChangeSelector);
    const onConnect = useStore(onConnectSelector);

    const getInitNodeData = (nodeID: string, type: string): NodeData => {
      let nodeData: NodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow') && reactFlowBounds) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            if (reactFlowInstance) {
              const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
              });

              const nodeID = getNodeID(type);
              const newNode = {
                id: nodeID,
                type,
                position,
                data: getInitNodeData(nodeID, type),
              };
      
              addNode(newNode);
            }
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType={ConnectionLineType.SmoothStep}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
