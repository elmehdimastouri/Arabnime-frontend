import React from "react";
import { notFound } from "next/navigation";
import { getChapterData } from "@/lib/api";
import WebtoonReader from "@/components/WebtoonReader";

export const revalidate = 120; // ISR 2 minutes

interface Props {
  params: {
    id: string;
  };
}

export default async function ChapterPage({ params }: Props) {
  const data = await getChapterData(params.id);

  if (!data) {
    notFound();
  }

  return <WebtoonReader data={data} />;
}
