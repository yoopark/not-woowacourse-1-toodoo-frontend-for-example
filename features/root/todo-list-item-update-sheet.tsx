'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEventHandler, ReactNode, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { QUERY_KEYS } from '@/constants/query-keys';
import { axiosPatchTodoOf } from '@/lib/apis';
import { Todo } from '@/types/todo';

type TodoListItemUpdateSheetProps = {
  trigger: ReactNode;
  todo: Todo;
};

const TodoListItemUpdateSheet = ({
  trigger,
  todo,
}: TodoListItemUpdateSheetProps) => {
  const queryClient = useQueryClient();

  const axiosPatchTodoTitleAndDescriptionOf = async (data: {
    todoId: number;
    title: string;
    description: string;
  }) => {
    const { todoId, title, description } = data;

    if (title === '') {
      throw new Error('title is required'); /* unreachable */
    }

    await axiosPatchTodoOf(todoId, {
      title,
      description: description === '' ? null : description,
    });
  };

  const { mutate } = useMutation({
    mutationFn: axiosPatchTodoTitleAndDescriptionOf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });

      toast.success('할 일을 수정했어요.');
    },
    onError: () => {
      toast.error('할 일 수정에 실패했어요. 잠시 후에 시도해주세요.');
    },
  });

  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(
    todo.description ?? '',
  );

  const isTitleEmpty = title === '';

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;

    setTitle(value);
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.currentTarget;

    setDescription(value);
  };

  const handleSubmit = () => {
    mutate({
      todoId: todo.id,
      title,
      description,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Update Todo</SheetTitle>
          <SheetDescription>
            View and edit the details of this reminder.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button disabled={isTitleEmpty} onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TodoListItemUpdateSheet;
