import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Button } from "@/registry/default/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DataTablePaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  total?: number;
};

export function DataTablePagination({
  current,
  pageCount,
  setCurrent,
  pageSize,
  setPageSize,
  total,
}: DataTablePaginationProps) {
  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-between",
        "flex-wrap",
        "px-2",
        "w-full",
        "gap-2",
      )}
    >
      <div
        className={cn(
          "flex-1",
          "text-sm",
          "text-muted-foreground",
          "whitespace-nowrap",
        )}
      >
        {typeof total === "number" ? `${total} row(s)` : null}
      </div>
      <div className={cn("flex", "items-center", "flex-wrap", "gap-2")}>
        <div className={cn("flex", "items-center", "gap-2")}>
          <span className={cn("text-sm", "font-medium")}>Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => setPageSize(Number(v))}
          >
            <SelectTrigger className={cn("h-8", "w-[70px]")}>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={cn("flex", "items-center", "flex-wrap", "gap-2")}>
          <div
            className={cn(
              "flex",
              "items-center",
              "justify-center",
              "text-sm",
              "font-medium",
            )}
          >
            Page {current} of {pageCount}
          </div>
          <div className={cn("flex", "items-center", "gap-2")}>
            <Button
              variant="outline"
              className={cn("hidden", "h-8", "w-8", "p-0", "lg:flex")}
              onClick={() => setCurrent(1)}
              disabled={current === 1}
              aria-label="Go to first page"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className={cn("h-8", "w-8", "p-0")}
              onClick={() => setCurrent(current - 1)}
              disabled={current === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className={cn("h-8", "w-8", "p-0")}
              onClick={() => setCurrent(current + 1)}
              disabled={current === pageCount}
              aria-label="Go to next page"
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className={cn("hidden", "h-8", "w-8", "p-0", "lg:flex")}
              onClick={() => setCurrent(pageCount)}
              disabled={current === pageCount}
              aria-label="Go to last page"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
