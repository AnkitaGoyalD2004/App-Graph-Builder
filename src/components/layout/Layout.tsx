import { useStore } from '@/store/useStore';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LeftRail } from './LeftRail';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function Layout({ children, rightPanel }: LayoutProps) {
  const { isMobilePanelOpen, setMobilePanelOpen } = useStore();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background text-foreground">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <LeftRail />
        <main className="flex-1 relative overflow-hidden bg-dot-pattern">
          {children}
        </main>
        
        {/* Desktop Right Panel */}
        <aside className="hidden lg:block w-80 border-l bg-muted/10 overflow-y-auto">
          {rightPanel}
        </aside>

        {/* Mobile Slide-over Drawer */}
        <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            {rightPanel}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
