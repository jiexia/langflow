import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useDarkStore } from "../../stores/darkStore";
import "../../style/ag-theme-shadcn.css"; // Custom CSS applied to the grid
import { cn } from "../../utils/utils";
import noDataTemplate from "./utils/no-data-template";

interface TableComponentProps extends AgGridReactProps {
  columnDefs: NonNullable<AgGridReactProps["columnDefs"]>;
  rowData: NonNullable<AgGridReactProps["rowData"]>;
}

const TableComponent = forwardRef<
  ElementRef<typeof AgGridReact>,
  TableComponentProps
>(({ ...props }, ref) => {
  const dark = useDarkStore((state) => state.dark);
  return (
    <div
      className={cn(
        dark ? "ag-theme-quartz-dark" : "ag-theme-quartz",
        "ag-theme-shadcn flex h-full flex-col",
      )} // applying the grid theme
    >
      <AgGridReact
        ref={ref}
        {...props}
        overlayNoRowsTemplate={noDataTemplate()}
      />
    </div>
  );
});

export default TableComponent;
