import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useLogin, useRefineOptions } from "@refinedev/core";
import { InputPassword } from "./input-password";
import { useState } from "react";
import { CircleHelp } from "lucide-react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { title } = useRefineOptions();

  const { mutate: login } = useLogin();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email: "test@test.com",
      password: "test",
    });
  };

  const handleSignInWithGoogle = () => {
    login({
      providerName: "google",
    });
  };

  const handleSignInWithGitHub = () => {
    login({
      providerName: "github",
    });
  };

  return (
    <Card className={cn("w-full", "max-w-[456px]", "p-12")}>
      <CardHeader className={cn("px-0")}>
        <CardTitle className={cn("text-primary", "text-3xl")}>
          Sign in
        </CardTitle>
        <CardDescription className={cn("text-muted-foreground", "font-medium")}>
          Welcome back to lorem ipsum dolor.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className={cn("px-0")}>
        <form onSubmit={handleSignIn}>
          <div className={cn("flex", "flex-col", "gap-2")}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={cn("relative", "flex", "flex-col", "gap-2", "mt-6")}>
            <Label htmlFor="password">Password</Label>
            <InputPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={cn("flex items-center justify-between", "mt-4")}>
            <div className={cn("flex items-center", "space-x-2")}>
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link
              to="/forgot-password"
              className={cn(
                "text-sm",
                "flex",
                "items-center",
                "gap-2",
                "text-blue-600 hover:underline",
              )}
            >
              <span>Forgot password</span>
              <CircleHelp className={cn("w-4", "h-4")} />
            </Link>
          </div>

          <Button type="submit" className={cn("w-full", "mt-6")}>
            Sign in
          </Button>

          <div className={cn("flex", "items-center", "gap-4", "h-5")}>
            <Separator className={cn("flex-1")} />
            <span className={cn("text-sm", "text-muted-foreground")}>or</span>
            <Separator className={cn("flex-1")} />
          </div>

          <div className={cn("flex", " flex-col", "gap-2")}>
            <p className={cn("text-sm", "font-medium")}>Sign in using</p>
            <div className={cn("grid grid-cols-2", "gap-[24px]")}>
              <Button
                variant="outline"
                className={cn("space-x-2")}
                onClick={handleSignInWithGoogle}
                type="button"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8375 8.63637C16.1151 8.63503 13.3926 8.6357 10.6702 8.63601C10.6705 9.76521 10.6688 10.8944 10.6708 12.0233C12.2475 12.0229 13.8242 12.0226 15.4005 12.0233C15.2178 13.1053 14.5747 14.0949 13.6628 14.704C13.0895 15.0895 12.4309 15.3397 11.7519 15.4586C11.0685 15.5752 10.3623 15.5902 9.68064 15.4522C8.9874 15.3138 8.32566 15.025 7.74838 14.6179C6.82531 13.9694 6.12086 13.0205 5.75916 11.9527C5.38931 10.8666 5.38659 9.65804 5.76085 8.57294C6.02053 7.80816 6.45275 7.10169 7.02054 6.52677C7.7209 5.80979 8.63145 5.29725 9.61248 5.08707C10.4525 4.90775 11.3383 4.94197 12.1607 5.19078C12.8597 5.40301 13.5041 5.78605 14.032 6.29013C14.5655 5.75959 15.0964 5.22602 15.629 4.6945C15.9083 4.4084 16.2019 4.13482 16.4724 3.84092C15.6636 3.09241 14.7154 2.49071 13.6794 2.11035C11.8143 1.42392 9.7108 1.40935 7.83312 2.05923C5.71711 2.78366 3.91535 4.36606 2.91636 6.36616C2.56856 7.05534 2.31463 7.79094 2.16209 8.54757C1.77834 10.4327 2.04582 12.4426 2.91533 14.1596C3.48044 15.2803 4.29063 16.2766 5.27339 17.0577C6.20055 17.797 7.28124 18.3431 8.42705 18.6479C9.87286 19.0357 11.4119 19.0269 12.8672 18.6957C14.1825 18.393 15.4269 17.7645 16.4205 16.8472C17.4707 15.882 18.2199 14.6105 18.6165 13.244C19.0491 11.7534 19.1088 10.1622 18.8375 8.63637Z"
                    fill="#18181B"
                  />
                </svg>

                <div>Google</div>
              </Button>
              <Button
                variant="outline"
                className={cn("space-x-2")}
                onClick={handleSignInWithGitHub}
                type="button"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 1.25C5.66797 1.25 1.75 5.26563 1.75 10.2227C1.75 14.1875 4.25781 17.5469 7.73438 18.7344C8.17188 18.8164 8.33203 18.5391 8.33203 18.3008C8.33203 18.0859 8.32422 17.5234 8.32031 16.7734C5.88672 17.3164 5.37109 15.5703 5.37109 15.5703C4.97266 14.5352 4.39844 14.2578 4.39844 14.2578C3.60547 13.6992 4.45703 13.7109 4.45703 13.7109C5.33594 13.7734 5.79688 14.6367 5.79688 14.6367C6.57812 16.0078 7.84375 15.6133 8.34375 15.3828C8.42188 14.8047 8.64844 14.4062 8.89844 14.1836C6.95703 13.957 4.91406 13.1875 4.91406 9.75C4.91406 8.76953 5.25391 7.96875 5.8125 7.34375C5.72266 7.11719 5.42188 6.20312 5.89844 4.96875C5.89844 4.96875 6.63281 4.72656 8.30469 5.88672C9.00391 5.6875 9.75 5.58984 10.4961 5.58594C11.2383 5.58984 11.9883 5.6875 12.6875 5.88672C14.3594 4.72656 15.0898 4.96875 15.0898 4.96875C15.5664 6.20312 15.2656 7.11719 15.1758 7.34375C15.7344 7.97266 16.0742 8.77344 16.0742 9.75C16.0742 13.1953 14.0273 13.9531 12.0781 14.1758C12.3906 14.4531 12.6719 15 12.6719 15.8359C12.6719 17.0352 12.6602 18.0039 12.6602 18.2969C12.6602 18.5352 12.8164 18.8164 13.2617 18.7266C16.7461 17.543 19.25 14.1836 19.25 10.2227C19.25 5.26563 15.332 1.25 10.5 1.25Z"
                    fill="#18181B"
                  />
                </svg>
                <div>GitHub</div>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

      <Separator />

      <CardFooter>
        <div className={cn("w-full", "text-center text-sm")}>
          No account?{" "}
          <Link to="/register" className={cn("text-green-600", "underline")}>
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
