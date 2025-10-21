import type { PropsWithChildren } from "react";

type TableFlexProps = {
    className?: string;
    alternate?: boolean;
    ratio?: string;
} & PropsWithChildren

export const TableHeader = ({ children, className }: TableFlexProps) => (
  <div className={`medication-table-header flex flex-row font-bold bg-table-header ${className}`}>
    {children}
  </div>
);

export const TableHeaderCell = ({ children, className, ratio }: TableFlexProps) => {
  return (
    <div className={`flex-1 ${ratio ? `basis-[${ratio}]` : ""} p-4 border-r last:border-r-table-header first:border-l first:border-l-table-header border-table-header-border ${className}`}>
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

export const TableCell = ({ children, className, ratio }: TableFlexProps) => {
  return (
    <div className={`p-4 flex-1 ${ratio ? `basis-[${ratio}]` : ""} border-r last:border-0 border-border ${className}`}>
      {children}
    </div>
  );
};