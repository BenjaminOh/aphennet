import { twMerge } from "tailwind-merge";

export default function LoadingSpinner({ console, className }: { console?: boolean; className?: string }) {
    return (
        <div className={twMerge("flex h-full flex-1 items-center justify-center", className)}>
            <div
                className={`h-10 w-10 animate-spin rounded-full border-4 border-t-transparent ${
                    console ? "border-console" : "border-primary"
                }`}
            ></div>
        </div>
    );
}
