import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Maximize, Moon, Settings, Share2, Plus } from 'lucide-react';

export function TopBar() {
  const { triggerAddNode } = useStore();

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 z-10">
      <div className="flex items-center gap-4">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground">
            A
          </div>
          <span className="hidden sm:inline">App Graph Builder</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="gap-2 mr-2"
          onClick={triggerAddNode}
        >
          <Plus className="h-4 w-4" />
          Add Node
        </Button>
        <Button variant="outline" size="icon" title="Fit View">
          <Maximize className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Moon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
