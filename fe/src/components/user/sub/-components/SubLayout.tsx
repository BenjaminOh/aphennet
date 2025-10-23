export default function SubLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-[1500px] p-[80px_20px] md:p-[120px_40px] min-[1510px]:px-0">
            {children}
        </div>
    );
}
