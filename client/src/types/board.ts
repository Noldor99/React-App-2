import { ITodolist } from "./todolist"

export interface IBoards {
  totalCount: number
  boards: IBoard[]
  titlesAll: string[]
}

export interface IBoard {
  id: string
  title: string
  createdAt: string
  todolists: ITodolist[]
}

export type IBoardTitles = IBoardTitle[]

export interface IBoardTitle {
  id: string
  title: string
}