"use client";

import dynamic from "next/dynamic";

const AuthFormExample = dynamic(
  () =>
    import("../../../examples/example-auth-form/auth-form-example").then(
      (mod) => mod.AuthFormExample,
    ),
  {
    ssr: false,
  },
);

export default function AuthFormPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <AuthFormExample />
    </div>
  );
}
