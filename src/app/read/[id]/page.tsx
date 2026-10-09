import React from "react";
import { notFound } from "next/navigation";
import { getChapterData } from "@/lib/api";
import WebtoonReader from "@/components/WebtoonReader";

export const revalidate = 120; // ISR 2 minutes

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChapterPage(props: Props) {
  const { id } = await props.params;
  const data = await getChapterData(id);

  if (!data) {
    notFound();
  }

  return <WebtoonReader data={data} />;
}
