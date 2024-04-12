import { TodoPriority } from "@/types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum HistoryAction {
  Create = "create",
  ReName = "ReName",
  ReDescription = "reDescription",
  Move = "move",
  Priority = "priority",
  Deadline = "deadline",
  Delete = "delete",
}

interface IHistory {
  action: HistoryAction;
  id: string;
  boardId: string;

  todoName?: string;
  todoOldName?: string;

  description?: string;
  descriptionOld?: string;

  variant?: string
  variantOld?: string

  priority?: TodoPriority
  priorityOld?: TodoPriority

  deadline?: Date
  deadlineOld?: Date

  data?: Date | string,
}


interface IHistoryState {
  actions: IHistory[];
}

const saveToLocalStorage = (cards: IHistory[]) => {
  localStorage.setItem("actions", JSON.stringify(cards));
};


const initialState: IHistoryState = {
  actions: JSON.parse(localStorage.getItem("actions") || "[]"),
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory(state, { payload }: PayloadAction<IHistory>) {
      state.actions.push({ ...payload, data: new Date().toISOString() });
      saveToLocalStorage(state.actions);
    },
  },
});

export const historyActions = historySlice.actions;
export const historyReducer = historySlice.reducer;
