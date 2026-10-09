import { redirect } from "next/navigation";

export default async function MangaRedirectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  redirect(`/webtoon/${slug}`);
}
