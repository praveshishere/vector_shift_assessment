import { Check, CircleX, X } from "lucide-react";
import React from "react";

interface PipelineResultAlertProps {
  numNodes: number;
  numEdges: number;
  isDag: boolean;
  onClose: () => void;
}

export const PipelineResultAlert: React.FC<PipelineResultAlertProps> = ({
  numNodes,
  numEdges,
  isDag,
  onClose,
}) => {
  return (
    <div className="fixed flex items-center justify-center h-screen w-screen bg-black/10 top-0 right-0 z-50 transition-all duration-500">
      <div className=" bg-white rounded-lg shadow-xl border border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between mb-4 gap-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Pipeline Analysis
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-600 text-2xl leading-none transition-colors hover:cursor-pointer"
            aria-label="Close"
          >
            <CircleX className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Nodes:</span>
            <span className="text-lg font-semibold text-gray-900">
              {numNodes}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Edges:</span>
            <span className="text-lg font-semibold text-gray-900">
              {numEdges}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-600">Is DAG:</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-semibold ${
                  isDag ? "text-green-600" : "text-red-600"
                }`}
              >
                {isDag ? "Yes" : "No"}
              </span>
              <span className="text-xl">
                {isDag ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
