import Sub from "@/components/user/sub/Sub";

export default function PostDetailPage({ params }: { params: { category: string; post_idx: string } }) {
    return <Sub category={params.category} postIdx={params.post_idx} />;
}
