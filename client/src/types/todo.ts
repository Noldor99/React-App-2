

export enum TodoPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface ITodos {
  totalCount: number
  todos: ITodo[]
}

export interface ITodo {
  id: string
  title: string
  description: string
  variant: string
  priority: TodoPriority
  deadline: Date
  createdAt: Date
  boardId: string
}
