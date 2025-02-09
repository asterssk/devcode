"use server";

import { TSnippetPost } from "@/lib/types/snippet";
import { waitTimeout } from "@/lib/utils";

export async function getDummySnippetPosts(count: number) {
  const res = await fetch(
    `https://www.uuidtools.com/api/generate/v4/count/${count}`,
    { cache: "no-store" }
  );

  const body = await res.json();

  if (body.errors) return [];

  return (body as string[]).map((id) => {
    const defaultVotesCount = Math.floor(Math.random() * 1599) + 199;

    return {
      id: id,
      username: `sample${count}`,
      title: `SAMPLE TITLE ${defaultVotesCount}`,
      author_name: "Sample Author Name",
      author_avatar: "faikeavatarurl",
      vote_action: "idle",
      content: "",
      date_posted: new Date().toDateString(),

      votes: defaultVotesCount,
      voted_count: defaultVotesCount,
      comments_count: Math.floor(Math.random() * 599) + 99,
    } as TSnippetPost;
  });
}

export async function upvoteSnippetPostAction(id: string) {
  console.log(id);
  await waitTimeout(1000);
}

export async function downvoteSnippetPostAction(id: string) {
  console.log(id);
  await waitTimeout(50000);
}
