import Sub from "@/components/user/sub/Sub";

export default function SubPage({ params }: { params: { category: string } }) {
    return <Sub category={params.category} />;
}
