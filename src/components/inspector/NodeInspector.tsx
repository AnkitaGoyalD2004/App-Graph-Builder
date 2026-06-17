import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NodeInspector() {
  const { 
    selectedNodeId, 
    setSelectedNodeId, 
    activeInspectorTab, 
    setActiveInspectorTab,
    nodes,
    updateNodeData 
  } = useStore();
  
  const selectedNode = nodes?.find((n: any) => n.id === selectedNodeId);
  
  // Synced state for Slider and Input
  const [cpuValue, setCpuValue] = useState<number>(0);

  useEffect(() => {
    if (selectedNode?.data?.cpu !== undefined) {
      setCpuValue(selectedNode.data.cpu);
    }
  }, [selectedNodeId, selectedNode]);

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <X className="w-6 h-6" />
        </div>
        <p className="text-sm">Select a node on the canvas to view its details</p>
      </div>
    );
  }

  const { data } = selectedNode;
  const statusColors = {
    healthy: 'bg-green-500/10 text-green-500 border-green-500/20',
    degraded: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    down: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">{data.label || 'Service Node'}</CardTitle>
          <Badge variant="outline" className={statusColors[data.status as keyof typeof statusColors]}>
            {data.status.toUpperCase()}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSelectedNodeId(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="config" className="flex-1">Config</TabsTrigger>
            <TabsTrigger value="runtime" className="flex-1">Runtime</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="config" className="p-4 space-y-6 m-0">
            <div className="space-y-2">
              <Label htmlFor="node-name">Node Name</Label>
              <Input 
                id="node-name" 
                value={data.label} 
                onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>CPU Reservation (%)</Label>
                <Input 
                  type="number" 
                  value={cpuValue} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCpuValue(val);
                    updateNodeData(selectedNode.id, { cpu: val });
                  }}
                  className="w-20 h-8"
                />
              </div>
              <Slider 
                value={[cpuValue]} 
                onValueChange={(vals) => {
                  setCpuValue(vals[0]);
                  updateNodeData(selectedNode.id, { cpu: vals[0] });
                }} 
                max={100} 
                step={1} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Memory</span>
                <p className="text-sm font-medium">{data.memory || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Storage</span>
                <p className="text-sm font-medium">{data.storage || 'N/A'}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="runtime" className="p-4 space-y-4 m-0">
             <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{data.region || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cloud Provider</span>
                    <span className="font-medium uppercase">{data.provider || 'N/A'}</span>
                  </div>
                </CardContent>
             </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
