"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocationProps {
  toolName: string;
  state: "result" | "call" | "partial-call";
  result?: any;
}

export function ToolInvocation({ toolName, state, result }: ToolInvocationProps) {
  const getToolDisplayName = (toolName: string): string => {
    const toolDisplayMap: Record<string, string> = {
      'str_replace_editor': 'Creating files',
      'create_file': 'Creating file',
      'update_file': 'Updating file', 
      'delete_file': 'Deleting file',
      'list_files': 'Listing files',
      'view_file': 'Reading file',
    };
    return toolDisplayMap[toolName] || toolName;
  };

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {state === "result" && result ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-neutral-700">{getToolDisplayName(toolName)}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-700">{getToolDisplayName(toolName)}</span>
        </>
      )}
    </div>
  );
}