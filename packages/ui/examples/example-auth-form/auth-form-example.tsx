"use client";

import { Refine, ErrorComponent, Authenticated } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router";
import { authProvider } from "@/examples/example-auth-form/providers/auth";
import { createDataProvider } from "@/examples/example-auth-form/providers/data";
import { API_URL } from "@/examples/example-auth-form/constants";
import { LoginForm } from "@/examples/example-auth-form/components/login-form";

export function AuthFormExample() {
  return (
    <BrowserRouter basename="/auth-form">
      <Refine
        dataProvider={createDataProvider(API_URL)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
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
              <Authenticated
                key="authenticated-routes"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/posts">
              <Route index element={<div>Posts List Page</div>} />
            </Route>
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

        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
