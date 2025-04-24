import { useResource, useGetToPath } from "@refinedev/core";
import React, { type PropsWithChildren } from "react";
import { Navigate, type NavigateProps } from "react-router";

type NavigateToResourceProps = PropsWithChildren<{
  resource?: string;
  meta?: Record<string, unknown>;
  navigateProps?: NavigateProps;
}>;

export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
  resource: resourceProp,
  meta,
  navigateProps,
}) => {
  const getToPath = useGetToPath();
  const { resource, resources } = useResource(resourceProp);

  const toResource = resource || resources.find((r) => r.list);

  if (toResource) {
    const path = getToPath({
      resource: toResource,
      action: "list",
      meta,
    });

    if (path) {
      return <Navigate to={path} {...navigateProps} />;
    }

    console.warn("No resource is found to navigate to.");
    return null;
  }
  console.warn("No resource is found to navigate to.");
  return null;
};
