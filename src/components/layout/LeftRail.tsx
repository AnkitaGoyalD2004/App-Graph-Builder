import {
  Box,
  CodeXml,
  Database,
  GitBranch,
  History,
  LayoutGrid,
  Settings2
} from 'lucide-react';

const icons = [
  { icon: CodeXml, label: 'Source' },
  { icon: LayoutGrid, label: 'Apps' },
  { icon: GitBranch, label: 'Workflows' },
  { icon: Database, label: 'Resources' },
  { icon: Box, label: 'Deployments' },
  { icon: History, label: 'History' },
  { icon: Settings2, label: 'Settings' },
];

export function LeftRail() {
  return (
    <aside className="w-16 border-r bg-muted/30 flex flex-col items-center py-4 gap-4">
      {icons.map((item, index) => (
        <button
          key={index}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </aside>
  );
}
