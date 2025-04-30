import type { CrudFilter, HttpError, BaseRecord } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { Column, HeaderContext } from "@tanstack/react-table";
import { Button } from "@/registry/default/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown, Filter, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { DataTablePagination } from "@/registry/default/refine-ui/table/pagination";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";

export type TableMeta = {
  variant?: "text" | "combobox";
  icon?:
    | React.ReactNode
    | ((context: HeaderContext<any, any>) => React.ReactNode);
  options?: { label: string; value: string }[];
  placeholder?: string;
  filterOperator?: CrudFilter["operator"];
};

type DataTableProps<TData extends BaseRecord, TValue> = {
  table: UseTableReturnType<TData, HttpError>;
};

export function DataTable<TData extends BaseRecord, TValue>({
  table,
}: DataTableProps<TData, TValue>) {
  const {
    getHeaderGroups,
    getRowModel,
    getAllColumns,
    refineCore: {
      tableQuery,
      current,
      pageCount,
      setCurrent,
      pageSize,
      setPageSize,
    },
  } = table;

  const columns = getAllColumns();

  return (
    <div className={cn("flex", "flex-col", "flex-1", "gap-4", "p-4")}>
      <div className={cn("rounded-md", "border")}>
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const context = header.getContext();
                  const isSortable = header.column.getCanSort();
                  const isFilterable = header.column.getCanFilter();
                  const isPlaceholder = header.isPlaceholder;

                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...getCommonStyles({ column: header.column }),
                      }}
                    >
                      {isPlaceholder ? null : (
                        <div className={cn("flex", "items-center", "gap-1")}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <div className={cn("flex", "items-center")}>
                            {isSortable && (
                              <TableHeaderSorter context={context} />
                            )}
                            {isFilterable && (
                              <TableHeaderFilterDropdown context={context} />
                            )}
                          </div>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableQuery.isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24", "text-center")}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonStyles({ column: cell.column }),
                        }}
                        className={cn("truncate")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24", "text-center")}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={tableQuery.data?.total}
      />
    </div>
  );
}

type TableHeaderSorterProps<TData, TValue> = {
  context: HeaderContext<TData, TValue>;
};

function TableHeaderSorter<TData, TValue>({
  context,
}: TableHeaderSorterProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => context.column.toggleSorting(undefined, true)}
      className={cn("data-[state=open]:bg-accent", "w-6 h-6")}
    >
      {context.column.getIsSorted() === "desc" ? (
        <ArrowDown className={cn("text-primary")} />
      ) : context.column.getIsSorted() === "asc" ? (
        <ArrowUp className={cn("text-primary")} />
      ) : (
        <ArrowUpDown className={cn("text-muted-foreground")} />
      )}
    </Button>
  );
}

type TableHeaderFilterDropdownProps<TData, TValue> = {
  context: HeaderContext<TData, TValue>;
};

function TableHeaderFilterDropdown<TData, TValue>({
  context,
}: TableHeaderFilterDropdownProps<TData, TValue>) {
  const meta = (context.column.columnDef?.meta as TableMeta) ?? {};
  const metaWithDefault = {
    ...meta,
    variant: meta?.variant ?? "text",
    icon: meta?.icon ?? <Filter className="!h-3 !w-3 text-muted-foreground" />,
    placeholder: meta?.placeholder ?? "Filter by ID",
  };

  const isFiltered = context.column.getIsFiltered();
  const filterValue = (context.column.getFilterValue() as string) ?? "";
  const variant = metaWithDefault.variant;

  const handleSetFilterValue = useCallback(
    (value: string) => {
      context.column.setFilterValue(value);
    },
    [context.column],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "data-[state=open]:bg-accent",
            "w-6 h-6",
            isFiltered && "text-primary",
          )}
        >
          {typeof metaWithDefault.icon === "function"
            ? metaWithDefault.icon(context)
            : metaWithDefault.icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        {variant === "text" && (
          <TableHeaderFilterText
            value={filterValue}
            placeholder={metaWithDefault.placeholder}
            onChange={handleSetFilterValue}
          />
        )}
        {variant === "combobox" && (
          <TableHeaderFilterCombobox
            value={filterValue}
            options={metaWithDefault.options ?? []}
            onSelect={handleSetFilterValue}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

type TableHeaderFilterTextProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function TableHeaderFilterText({
  value,
  placeholder,
  onChange,
}: TableHeaderFilterTextProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

type TableHeaderFilterComboboxProps = {
  value: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

function TableHeaderFilterCombobox({
  value,
  options,
  onSelect,
}: TableHeaderFilterComboboxProps) {
  return (
    <Command>
      <CommandInput placeholder="Search framework..." />
      <CommandList>
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={onSelect}
            >
              {option.label}
              <Check
                className={cn(
                  "ml-auto",
                  value === option.value ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function getCommonStyles<TData>({
  column,
}: {
  column: Column<TData>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px var(--border) inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px var(--border) inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "var(--background)" : "",
    borderTopRightRadius: isPinned === "right" ? "var(--radius)" : undefined,
    borderBottomRightRadius: isPinned === "right" ? "var(--radius)" : undefined,
    borderTopLeftRadius: isPinned === "left" ? "var(--radius)" : undefined,
    borderBottomLeftRadius: isPinned === "left" ? "var(--radius)" : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
