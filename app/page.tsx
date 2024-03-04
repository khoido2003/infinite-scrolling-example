"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { resolve } from "path";

const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
  { id: 5, title: "post 5" },
  { id: 6, title: "post 6" },
  { id: 7, title: "post 7" },
];

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return posts.slice((page - 1) * 2, page * 2);
};

const Page = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],

    queryFn: async ({ pageParams = 1 }) => {
      const response = await fetchPost(pageParams);
      return response;
    },
  });
};

export default function Home() {
  return <div></div>;
}
