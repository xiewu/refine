import { type ChangeEvent, useState } from "react";
import { Input } from "@/registry/default/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputPasswordProps = {
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const InputPassword = ({
  className,
  value,
  onChange,
  ...props
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative")}>
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(className)}
        value={value}
        onChange={onChange}
        {...props}
      />
      <button
        type="button"
        className={cn(
          "appearance-none",
          "cursor-pointer",
          "absolute right-3 top-1/2 -translate-y-1/2",
        )}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff size={18} className={cn("text-gray-500")} />
        ) : (
          <Eye size={18} className={cn("text-gray-500")} />
        )}
      </button>
    </div>
  );
};
