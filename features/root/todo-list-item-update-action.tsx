import TodoListItemUpdateButton from '@/features/root/todo-list-item-update-button';
import TodoListItemUpdateSheet from '@/features/root/todo-list-item-update-sheet';
import { Todo } from '@/types/todo';

type TodoListItemUpdateActionProps = {
  todo: Todo;
};

const TodoListItemUpdateAction = ({ todo }: TodoListItemUpdateActionProps) => {
  return (
    <TodoListItemUpdateSheet
      trigger={<TodoListItemUpdateButton />}
      todo={todo}
    />
  );
};

export default TodoListItemUpdateAction;
