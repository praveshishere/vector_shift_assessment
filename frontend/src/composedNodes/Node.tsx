import React, { useState, createContext, useContext } from "react";
import { Handle, Position } from "reactflow";
import { CircleX } from "lucide-react";
import { cn } from "../utils/cn";

interface NodeContextType {
  title: string;
  name: string;
  setName: (name: string) => void;
  hasCustomLabel: boolean;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodeContext must be used within a Node component");
  }
  return context;
};

const hasComponentType = (
  children: React.ReactNode,
  componentType: any
): boolean => {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (found) return;
    if (React.isValidElement(child)) {
      if (child.type === componentType) {
        found = true;
      } else if (child.props?.children) {
        found = hasComponentType(child.props.children, componentType);
      }
    }
  });
  return found;
};

interface NodeProps {
  children?: React.ReactNode;
  title?: string;
  handles?: {
    position: Position;
    type: "source" | "target";
    id: string;
    style?: React.CSSProperties;
  }[];
  id?: string;
  className?: string;
}

export const Node: React.FC<NodeProps> & {
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Label: React.FC<LabelProps>;
} = ({ children, handles = [], title = "Node", id = "", className }) => {
  const [name, setName] = useState(id);

  const hasCustomHeader = hasComponentType(children, Node.Header);
  const hasCustomLabel = hasComponentType(children, Node.Label);

  const contextValue: NodeContextType = {
    title,
    name,
    setName,
    hasCustomLabel,
  };

  return (
    <NodeContext.Provider value={contextValue}>
      <div
        className={cn(
          "min-w-[200px] min-h-[80px] border border-indigo-900/60 grid grid-cols-1 rounded-sm",
          className
        )}
      >
        {!hasCustomHeader ? <Node.Header /> : <></>}
        {children}
        <>
          {handles.map((handle) => (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={handle.style}
            />
          ))}
        </>
      </div>
    </NodeContext.Provider>
  );
};

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { title } = useNodeContext();

  if (!children) {
    return (
      <div
        className={cn(
          "flex justify-between gap-3 py-1 px-2 m-1 bg-indigo-100 rounded-sm border border-indigo-300 h-fit",
          className
        )}
      >
        <div className="flex items-center gap-3 text-gray-900">
          <div className="font-medium text-sm">{title}</div>
        </div>
        <div className="">
          <button
            className="text-gray-900 h-fit rounded-sm hover:cursor-pointer"
            title="Delete Node"
          >
            <CircleX className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

interface BodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({ children, className }) => {
  const { hasCustomLabel } = useNodeContext();

  if (!hasCustomLabel) {
    return (
      <div className={cn("px-2 pb-2", className)}>
        <Node.Label />
        {children}
      </div>
    );
  }

  return <div className={cn("px-2 pb-2", className)}>{children}</div>;
};

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, className }) => {
  const { name, setName } = useNodeContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="text"
        id={`node-label-${name}`}
        value={name}
        onChange={handleNameChange}
        className="text-center py-1 px-2 h-fit bg-indigo-200/50 rounded-sm border-0 outline-0 text-xs tracking-wide w-full"
      />
    </div>
  );
};

Node.Header = Header;
Node.Body = Body;
Node.Label = Label;
