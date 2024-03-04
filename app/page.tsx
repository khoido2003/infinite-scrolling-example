"use client";

import { TodoCard } from "@/components/todo-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export interface Todo {
  id: string;
  title: string;
}

const fetchTodos = async (props) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${props.pageParam}`
  );

  return res.json();
};
export default function Home() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialPageParam: 1,
    getNextPageParam: (page, allPages) => {
      console.log(page);
      const nextPage = page.length ? allPages.length + 1 : undefined;

      console.log(page);

      return nextPage;
      // return allPages.length + 1;
    },
  });

  const content = data?.pages.map((todos: Todo[]) =>
    todos.map((todo, index) => {
      if (todos.length === index + 1)
        return <TodoCard innerRef={ref} key={todo.id} todo={todo} />;
      return <TodoCard key={todo.id} todo={todo} />;
    })
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "error") return <p>Error</p>;
  if (status === "pending") return <p>Loading...</p>;
  return (
    <div className="app">
      {content}

      {/* <button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="text-center flex items-center justify-center border-black p-3 bg-blue-500 rounded-md mb-4"
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load more"
          : "Nothing else to load"}
      </button> */}
    </div>
  );
}
