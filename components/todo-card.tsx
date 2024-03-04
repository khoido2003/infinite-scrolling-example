import { Todo } from "@/app/page";

interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  todo: Todo;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export const TodoCard = ({ todo, innerRef, ...props }: TodoCardProps) => {
  return (
    <p className="todo-card" key={todo.id} ref={innerRef} {...props}>
      {todo.title}{" "}
    </p>
  );
};
