import { ITodo } from "./todo"

export interface ITodolists {
  totalCount: number
  todolists: ITodolist[]
}

export interface ITodolist {
  id: string
  title: string
  createdAt: string
  todos: ITodo[]
}

