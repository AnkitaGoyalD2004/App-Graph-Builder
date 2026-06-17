import { create } from 'zustand';
import { 
  applyNodeChanges, 
  applyEdgeChanges, 
  Node, 
  Edge, 
  NodeChange, 
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  addEdge,
  Connection
} from '@xyflow/react';

interface UIState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  addNodeTrigger: number;
  
  nodes: Node[];
  edges: Edge[];
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
  
  triggerAddNode: () => void;
  updateNodeData: (nodeId: string, data: any) => void;
}

export const useStore = create<UIState>((set, get) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  addNodeTrigger: 0,
  
  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  
  triggerAddNode: () => set((state) => ({ addNodeTrigger: state.addNodeTrigger + 1 })),
  
  updateNodeData: (nodeId, data) => set((state) => ({
    nodes: state.nodes.map((node) => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    )
  })),
}));
