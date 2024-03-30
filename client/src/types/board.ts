import { ITodo } from "./todo"

export interface IBoards {
  totalCount: number
  boards: IBoard[]
  titlesAll: string[]
}

export interface IBoard {
  id: string
  title: string
  createdAt: string
  todos: ITodo[]
}

export type IBoardTitles = IBoardTitle[]

export interface IBoardTitle {
  id: string
  title: string
}