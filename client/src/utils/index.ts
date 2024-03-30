import { useTypedDispatch } from "@/hook/useTypedDispatch";
import { HistoryAction } from "@/store/slice/historySlice";

import { ITodo } from "@/types/todo";

export function historyToSlice(dispatch: ReturnType<typeof useTypedDispatch>, fields: Partial<ITodo>, todoNew: ITodo) {
  const addHistory = dispatch.addHistory;

  if (fields.title) {
    addHistory({
      action: HistoryAction.ReName,
      id: todoNew.id,
      boardId: todoNew.boardId,
      todoOldName: todoNew.title,
      todoName: fields.title
    });
  }

  if (fields.description) {
    addHistory({
      action: HistoryAction.ReDescription,
      id: todoNew.id,
      boardId: todoNew.boardId,
      todoName: todoNew.title,
      descriptionOld: todoNew.description,
      description: fields.description
    });
  }

  if (fields.variant) {
    addHistory({
      action: HistoryAction.Move,
      id: todoNew.id,
      boardId: todoNew.boardId,
      todoName: todoNew.title,
      variantOld: todoNew.variant,
      variant: fields.variant
    });
  }

  if (fields.priority) {
    addHistory({
      action: HistoryAction.Priority,
      id: todoNew.id,
      boardId: todoNew.boardId,
      todoName: todoNew.title,
      priorityOld: todoNew.priority,
      priority: fields.priority
    });
  }

  if (fields.deadline) {
    addHistory({
      action: HistoryAction.Deadline,
      id: todoNew.id,
      boardId: todoNew.boardId,
      todoName: todoNew.title,
      deadlineOld: todoNew.deadline,
      deadline: fields.deadline
    });
  }
}
