import { useStore } from '@/store/useStore';
import { useApps } from '@/hooks/useData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ChevronRight, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AppSelector() {
  const { selectedAppId, setSelectedAppId } = useStore();
  const { data: apps, isLoading } = useApps();

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-4 border-b space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          Application
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-9" />
          </div>
          <Button size="icon" variant="secondary" className="h-9 w-9">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground animate-pulse">Loading apps...</div>
          ) : (
            apps?.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`w-full flex items-center justify-between p-3 rounded-md text-sm transition-colors ${
                  selectedAppId === app.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'hover:bg-accent text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${selectedAppId === app.id ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                  {app.name}
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
