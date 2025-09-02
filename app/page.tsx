import { db } from "@/prisma/db";
import TodoList from "./ui/todo-list";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Things todo</h1>
      <TodoList defaultTodos={todos} />
    </main>
  );
}
