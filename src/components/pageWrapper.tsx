import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="animate-fadeIn transform transition duration-1000 ease-in-out opacity-0 translate-y-10">
      {children}
    </div>
  );
};

export default PageWrapper;
