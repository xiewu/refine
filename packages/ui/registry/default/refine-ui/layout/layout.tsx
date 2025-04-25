import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset } from "@/registry/default/ui/sidebar";
import { Sidebar } from "@/registry/default/refine-ui/layout/sidebar";
import { Header } from "@/registry/default/refine-ui/layout/header";
import { ThemeProvider } from "@/registry/default/refine-ui/layout/theme-provider";
import { cn } from "@/lib/utils";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main className={cn("p-2", "md:p-4", "lg:p-6")}>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
