import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { ITodolist, ITodolists } from '@/types/todolist';

export const TodolistSchema = z.object({
  boardId: z
    .string().optional(),
  title: z
    .string()
    .min(3, { message: 'title must be at least 3 characters.' })
    .max(50, { message: 'title must be at most 50 characters.' }),

});

export type ITodolistSchema = z.infer<typeof TodolistSchema>

export interface QueryTodolistParams {
  page?: string;
  limit?: string;
  boardId?: string
}

export interface ApiTodolist {
  create: (body: ITodolistSchema) => Promise<ITodolist>;
  getAll: (params: QueryTodolistParams) => Promise<ITodolists>;
  getOne: (id: string) => Promise<ITodolist>;
  update: (todolistId: string, data: Partial<ITodolistSchema>) => Promise<ITodolist>;
  remove: (id: string) => Promise<void>;
}

export const apiTodolist: ApiTodolist = {
  create: (body) => api.post('/todolist', body).then(qw),
  getAll: (params) => api.get('/todolist', { params }).then(qw),
  getOne: (id) => api.get(`/todolist/${id}`).then(qw),
  update: (todolistId, body) => api.patch(`/todolist/${todolistId}`, body).then(qw),
  remove: (id) => api.delete(`/todolist/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;