import { redirect } from "next/navigation";

export default function MangaRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/webtoon/${params.slug}`);
}
