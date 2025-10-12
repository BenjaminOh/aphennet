import LoadingSpinner from "@/components/common/common/LoadingSpinner";

export default function LoadingPop({ console }: { console?: boolean }) {
    return (
        <div className="pointer-events-auto fixed inset-0 z-[300]">
            <LoadingSpinner console={console} />
        </div>
    );
}
