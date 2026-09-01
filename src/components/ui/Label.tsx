import { cn } from "@/lib/cn";

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
};

export function Label({ children, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-small font-medium text-ink", className)}
    >
      {children}
    </label>
  );
}
