"use client";

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

// Set up the unstable render method for Ant Design React 19 compatibility
unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

// This component doesn't render anything, it just sets up the compatibility
export default function AntdCompat() {
  return null;
}
