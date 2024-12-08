import React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  const defaultClasses = "animate-pulse rounded-md bg-slate-100 dark:bg-slate-800";
  
  // Merge default classes with any additional className
  const combinedClassName = className 
    ? `${defaultClasses} ${className}` 
    : defaultClasses;

  return (
    <div
      className={combinedClassName}
      {...props}
    />
  );
};

export { Skeleton };