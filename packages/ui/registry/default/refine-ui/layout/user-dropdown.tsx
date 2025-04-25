import { useGetIdentity } from "@refinedev/core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type UserDropdownProps = {
  className?: string;
};

export function UserDropdown({ className }: UserDropdownProps) {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading) {
    return (
      <div className={cn("flex", "items-center", "gap-x-2", className)}>
        <Skeleton className={cn("h-8", "w-8", "rounded-full")} />
        <div className={cn("flex", "flex-col", "gap-y-1")}>
          <Skeleton className={cn("h-4", "w-24")} />
          <Skeleton className={cn("h-3", "w-32")} />
        </div>
        <Skeleton className={cn("h-4", "w-4", "ml-auto")} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email, avatar } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex",
            "items-center",
            "gap-x-2",
            "p-2",
            "rounded-md",
            "hover:bg-accent",
            "focus:outline-none",
            "w-full",
            "text-left",
            className,
          )}
        >
          <Avatar className={cn("h-8", "w-8")}>
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className={cn("flex", "flex-col")}>
            <span className={cn("text-sm", "font-medium", "text-foreground")}>
              {name}
            </span>
            <span className={cn("text-xs", "text-muted-foreground")}>
              {email}
            </span>
          </div>
          <ChevronUp
            className={cn("h-4", "w-4", "ml-auto", "text-muted-foreground")}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>item1</DropdownMenuItem>
        <DropdownMenuItem>item2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const getInitials = (name = "") => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
