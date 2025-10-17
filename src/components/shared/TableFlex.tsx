import type { PropsWithChildren } from "react";

type TableFlexProps = {
    className?: string;
    alternate?: boolean;
} & PropsWithChildren

export const TableHeader = ({ children, className }: TableFlexProps) => (
  <div className={`medication-table-header flex flex-row text-xs font-bold bg-table-header ${className}`}>
    {children}
  </div>
);

export const TableHeaderCell = ({ children, className }: TableFlexProps) => {
  return (
    <div className={`flex-1 p-4 border-r last:border-0 border-table-header-border ${className}`}>
      {children}
    </div>
  );
};

export const TableRow = ({ children, className, alternate }: TableFlexProps) => {
  return (
    <div className={`medication-row flex flex-row border border-t-0 border-border ${alternate ? "bg-table-header/30" : "bg-transparent"} ${className}`}>
      {children}
    </div>
  );
};

export const TableCell = ({ children, className }: TableFlexProps) => {
  return (
    <div className={`p-4 flex-1 text-xs border-r last:border-0 border-border ${className}`}>
      {children}
    </div>
  );
};