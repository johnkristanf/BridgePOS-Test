import { useQuery } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { useQueryState } from "nuqs"
import React, { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/fallbacks/skeleton"
import { Input } from "@/components/ui/inputs/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination, PaginationInfo } from "./data-table-pagination"

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string | React.ReactNode
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
  className?: string
  mobileLabel?: string
  showInMobileCard?: boolean
}

export interface DataTableProps<T> {
  queryKey: string[]
  queryFn: (params: {
    page: number
    limit: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) => Promise<{
    data: T[]
    pagination: PaginationInfo
  }>
  columns: DataTableColumn<T>[]
  toolbar?: React.ReactNode
  searchPlaceholder?: string
  pageSizeOptions?: number[]
  defaultPageSize?: number
  emptyMessage?: string
  loadingRows?: number
  mobileCardComponent?: (item: T) => React.ReactNode
  enableMobileCards?: boolean
}

export function DataTable<T extends Record<string, any>>({
  queryKey,
  queryFn,
  columns,
  toolbar,
  searchPlaceholder = "Search...",
  pageSizeOptions = [10, 20, 50, 100],
  defaultPageSize = 10,
  emptyMessage = "No data available",
  loadingRows = 5,
  mobileCardComponent,
  enableMobileCards = true,
}: DataTableProps<T>) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value, 10) || 1,
  })

  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: defaultPageSize,
    parse: (value) => parseInt(value, 10) || defaultPageSize,
  })

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  })

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "",
  })

  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc" as "asc" | "desc",
    parse: (value) => (value === "desc" ? "desc" : "asc") as "asc" | "desc",
  })

  const [searchInput, setSearchInput] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput)
        setPage(1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchInput, search, setSearch, setPage])

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [...queryKey, page, limit, search, sortBy, sortOrder],
    queryFn: () =>
      queryFn({
        page,
        limit,
        search: search || undefined,
        sortBy: sortBy || undefined,
        sortOrder,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("4")) {
        return false
      }
      return failureCount < 3
    },
  })

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
    },
    [],
  )

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey)
    if (!column?.sortable) return

    if (sortBy === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(columnKey)
      setSortOrder("asc")
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: string) => {
    setLimit(parseInt(newPageSize, 10))
    setPage(1)
  }

  const renderCellContent = (item: T, column: DataTableColumn<T>) => {
    if (column.cell) {
      return column.cell(item)
    }

    const value = item[column.key as keyof T]
    return value?.toString() || ""
  }

  const getHeaderText = (column: DataTableColumn<T>): string => {
    if (typeof column.header === "string") {
      return column.header
    }
    return column.mobileLabel || String(column.key)
  }

  const DefaultMobileCard = ({ item }: { item: T }) => {
    const mobileColumns = columns.filter(
      (col) => col.showInMobileCard !== false,
    )

    return (
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="space-y-2">
            {mobileColumns.map((column, index) => {
              const value = renderCellContent(item, column)
              const label = column.mobileLabel || getHeaderText(column)

              return (
                <div key={index} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground min-w-0 mr-2">
                    {label}:
                  </span>
                  <div className="text-sm text-right flex-1 min-w-0">
                    {value}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  const MobileLoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: loadingRows }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, skeletonIndex) => (
                <div key={skeletonIndex} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const DesktopLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <TableRow key={index}>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.className}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading data</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    )
  }

  const data = response?.data || []
  const pagination = response?.pagination

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-10"
            disabled={isFetching}
          />
        </div>

        {toolbar && (
          <div className="flex items-center gap-2 flex-wrap">{toolbar}</div>
        )}
      </div>

      {enableMobileCards && (
        <div className="block md:hidden">
          {isLoading || isFetching ? (
            <MobileLoadingSkeleton />
          ) : data.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">{emptyMessage}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index}>
                  {mobileCardComponent ? (
                    mobileCardComponent(item)
                  ) : (
                    <DefaultMobileCard item={item} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div
        className={`rounded-md border overflow-hidden ${
          enableMobileCards ? "hidden md:block" : ""
        }`}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`${column.className || ""} ${
                      column.sortable
                        ? "cursor-pointer hover:bg-muted/50 select-none"
                        : ""
                    }`}
                    onClick={() =>
                      column.sortable &&
                      !isFetching &&
                      handleSort(column.key as string)
                    }
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`h-3 w-3 ${
                              sortBy === column.key && sortOrder === "asc"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          />
                          <ChevronDown
                            className={`h-3 w-3 ${
                              sortBy === column.key && sortOrder === "desc"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || isFetching ? (
                <DesktopLoadingSkeleton />
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={column.className || ""}
                      >
                        {renderCellContent(item, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination && (
        <DataTablePagination
          pagination={pagination}
          limit={limit}
          pageSizeOptions={pageSizeOptions}
          isFetching={isFetching}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
