'use client';

import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from '@/lib/reactDnd/dndBackends';

export default function DndProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>;
}
