import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** First form input in the codebase — matches the token system directly
 * rather than inventing new styling. Focus state comes from the global
 * :focus-visible rule in globals.css, no extra ring classes needed. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-edge border border-hairline bg-surface px-4 text-body text-ink placeholder:text-muted transition-colors duration-150 ease-standard hover:border-neutral",
        className,
      )}
      {...props}
    />
  );
});
