import TodoFetcher from '@/features/root/todo-fetcher';

const RootPage = () => {
  return (
    <main className="max-w-screen-sm mx-auto">
      <div className="p-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Reminders</h1>
          <TodoFetcher />
        </div>
      </div>
    </main>
  );
};

export default RootPage;
