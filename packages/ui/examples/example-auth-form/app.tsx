"use client";

import { Refine, ErrorComponent, Authenticated } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "@/examples/example-auth-form/providers/auth";
import { createDataProvider } from "@/examples/example-auth-form/providers/data";
import { API_URL } from "@/examples/example-auth-form/constants";
import { LoginForm } from "@/examples/example-auth-form/components/login-form";
import { notificationProvider } from "./providers/notification";
import { Toaster } from "@/registry/default/ui/sonner";
import { AppLayout } from "./components/layout";
import {
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

export function AuthFormExample() {
  return (
    <BrowserRouter basename="/auth-form">
      <Refine
        dataProvider={createDataProvider(API_URL)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "home",
            list: "/",
            icon: <HomeIcon />,
            meta: {
              label: "Home",
            },
          },
          {
            name: "posts",
            list: "/posts",
            icon: <FileIcon />,
          },
          {
            name: "users",
            list: "/users",
            icon: <UserIcon />,
          },
          {
            name: "settings",
            icon: <SettingsIcon />,
          },
          {
            name: "Directory",
            list: "/directory",
            icon: <FolderIcon />,
          },
          {
            name: "profile",
            list: "/profile",
            meta: {
              parent: "settings",
            },
          },
          {
            name: "notifications",
            list: "/notifications",
            icon: <BellIcon />,
            meta: {
              parent: "settings",
            },
          },
          {
            name: "finance",
            meta: {
              group: true,
            },
          },
          {
            name: "expenses",
            list: "/expenses",
            icon: <CreditCardIcon />,
            meta: {
              parent: "finance",
            },
          },
          {
            name: "income",
            list: "/income",
            icon: <DollarSignIcon />,
            meta: {
              parent: "finance",
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <AppLayout>
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Outlet />
                </Authenticated>
              </AppLayout>
            }
          >
            <Route path="/" element={<div>Home</div>} />
            <Route path="/posts" element={<div>Posts List Page</div>} />
            <Route path="/users" element={<div>Users List Page</div>} />
            <Route path="/settings" element={<div>Settings List Page</div>} />
            <Route path="/profile" element={<div>Profile List Page</div>} />
            <Route
              path="/notifications"
              element={<div>Notifications List Page</div>}
            />
            <Route path="/finance" element={<div>Finance List Page</div>} />
            <Route path="/expenses" element={<div>Expenses List Page</div>} />
            <Route path="/income" element={<div>Income List Page</div>} />
            <Route path="/directory" element={<div>Directory List Page</div>} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<LoginForm />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Outlet />
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>

        <Toaster />
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
