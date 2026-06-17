export interface App {
  id: string;
  name: string;
}

export interface NodeData {
  label: string;
  status: 'healthy' | 'degraded' | 'down';
  cpu?: number;
  memory?: string;
  storage?: string;
  region?: string;
  provider?: 'aws' | 'gcp' | 'azure';
}

export const mockApps: App[] = [
  { id: '1', name: 'supertokens-golang' },
  { id: '2', name: 'supertokens-java' },
  { id: '3', name: 'supertokens-python' },
  { id: '4', name: 'supertokens-ruby' },
  { id: '5', name: 'supertokens-go' },
];

export const mockGraphs: Record<string, any> = {
  '1': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 100, y: 100 },
        data: { label: 'Auth Service', status: 'healthy', cpu: 45, memory: '2GB', storage: '10GB', region: 'us-east-1', provider: 'aws' },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 400, y: 100 },
        data: { label: 'Postgres DB', status: 'healthy', cpu: 12, memory: '8GB', storage: '100GB', region: 'us-east-1', provider: 'aws' },
      },
      {
        id: 'node-3',
        type: 'default',
        position: { x: 250, y: 300 },
        data: { label: 'Redis Cache', status: 'degraded', cpu: 80, memory: '1GB', storage: '5GB', region: 'us-east-1', provider: 'aws' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2' },
      { id: 'e1-3', source: 'node-1', target: 'node-3' },
    ],
  },
};

export const fetchApps = async (): Promise<App[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate latency
  return mockApps;
};

export const fetchAppGraph = async (appId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate latency
  if (!mockGraphs[appId]) {
    // Return a default graph if not found
    return mockGraphs['1'];
  }
  return mockGraphs[appId];
};
