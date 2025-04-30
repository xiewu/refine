import { useTable } from "@refinedev/core";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/registry/default/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { DataTablePagination } from "@/registry/default/refine-ui/table/pagination";
import type { User } from "@/examples/example-auth-form/types/resources";
import { cn } from "@/lib/utils";

export function UsersListPage() {
  const { tableQuery, current, pageCount, setCurrent, pageSize, setPageSize } =
    useTable<User>({ resource: "users" });
  const users = tableQuery.data?.data ?? [];
  const isLoading = tableQuery.isLoading;
  const total = tableQuery.data?.total;

  return (
    <div className={cn("flex", "flex-col", "flex-1")}>
      <div
        className={cn(
          "rounded-md",
          "border",
          "relative",
          "flex",
          "flex-col",
          "gap-4",
        )}
      >
        <div className={cn("overflow-x-auto")}>
          <Table>
            <TableHeader className={cn("bg-muted")}>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Birthday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className={cn("text-center")}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className={cn("text-center")}>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.firstName}>
                    <TableCell>
                      <div className={cn("flex", "items-center", "gap-2")}>
                        <Avatar>
                          <AvatarImage src={user.avatar[0].url} />
                          <AvatarFallback>
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span>
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className={cn("flex", "flex-wrap", "gap-2")}>
                        {user.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.birthday).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className={cn("mt-4")}>
        <DataTablePagination
          current={current}
          pageCount={pageCount}
          setCurrent={setCurrent}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={total}
        />
      </div>
    </div>
  );
}
