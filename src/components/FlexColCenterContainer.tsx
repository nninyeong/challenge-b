import React, { ReactNode } from 'react';

const FlexColCenterContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`flex flex-col justify-center items-center ${className || ''}`}>{children}</div>;
};

export default FlexColCenterContainer;
