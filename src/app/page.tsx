import TableSection from "@/features/home/components/sections/table-section";
import { getTodos } from "@/services/todo.service";
import { TTodo } from "@/types/todo.type";

export const revalidate = 0;

type TSearchParams = {
  page?: string;
  limit?: string;
};

interface IPageProps {
  searchParams: Promise<TSearchParams>;
}

const Page = async ({ searchParams }: IPageProps) => {
  const resolvedParams = await searchParams;
  const { page = "1", limit = "10" } = resolvedParams;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const start = (pageNum - 1) * limitNum;

  const todos: TTodo[] = await getTodos(start, limitNum);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <TableSection initialData={todos} page={pageNum} limit={limitNum} />
    </main>
  );
};

export default Page;
