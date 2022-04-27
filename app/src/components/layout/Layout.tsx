import { memo, ReactNode } from 'react';

const Layout = memo(({ children }: { children: ReactNode }) => {
  return <div className="main">{children}</div>;
});

export default Layout;
