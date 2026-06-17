import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store/useStore';
import { Layout } from './components/layout/Layout';
import { GraphCanvas } from './components/canvas/GraphCanvas';
import { AppSelector } from './components/inspector/AppSelector';
import { NodeInspector } from './components/inspector/NodeInspector';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { selectedNodeId, selectedAppId, setSelectedAppId } = useStore();

  // Set initial app if none selected
  useEffect(() => {
    if (!selectedAppId) {
      setSelectedAppId('1');
    }
  }, [selectedAppId, setSelectedAppId]);

  const rightPanel = selectedNodeId ? <NodeInspector /> : <AppSelector />;

  return (
    <Layout rightPanel={rightPanel}>
      <GraphCanvas />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
