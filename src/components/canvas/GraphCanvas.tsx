import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';

import { useAppGraph } from '@/hooks/useData';
import { useStore } from '@/store/useStore';

export function GraphCanvas() {
  const { 
    selectedAppId, 
    setSelectedNodeId, 
    addNodeTrigger, 
    nodes, 
    edges, 
    setNodes, 
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore();
  
  const { data: graphData, isLoading } = useAppGraph(selectedAppId);

  // Initial load of graph data into the store
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes || []);
      setEdges(graphData.edges || []);
    }
  }, [graphData, setNodes, setEdges]);

  // Handle adding a new node
  useEffect(() => {
    if (addNodeTrigger > 0) {
      const id = `node-${Date.now()}`;
      const newNode = {
        id,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { 
          label: `New Service ${nodes.length + 1}`, 
          status: 'healthy', 
          cpu: 0, 
          memory: '1GB', 
          storage: '10GB', 
          region: 'us-east-1', 
          provider: 'aws' 
        },
      };
      setNodes([...nodes, newNode]);
      setSelectedNodeId(id);
    }
  }, [addNodeTrigger]);

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      setSelectedNodeId(node.id);
      if (window.innerWidth < 1024) {
        useStore.getState().setMobilePanelOpen(true);
      }
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        colorMode="dark"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
