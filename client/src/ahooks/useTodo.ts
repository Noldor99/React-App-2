import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  ITodoSchema,
  QueryTodoParams,
  apiTodo,
} from '@/actions/client/todoAction'
import { useTypedDispatch } from '@/hook/useTypedDispatch'
import { HistoryAction } from '@/store/slice/historySlice'


export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  const { addHistory } = useTypedDispatch()


  return useMutation({
    mutationFn: (body: ITodoSchema) => apiTodo.create(body),
    onSuccess: (data) => {
      addHistory({
        action: HistoryAction.Create,
        id: data.id,
        boardId: data.boardId,
        todoName: data.title,
        variant: data.variant
      });
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    },
  })
}

export const useUpdateTodo = (id: string) => {

  const queryClient = useQueryClient()


  return useMutation({
    mutationFn: (body: Partial<ITodoSchema>) => apiTodo.update(id!, body),
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['todo', id],
      // })
    },
  })
}

export const useGetTodo = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryTodoParams
}) =>
  useQuery({
    queryKey: ['todo', params?.boardId],
    queryFn: () => apiTodo.getAll(params ?? {}),
    enabled,
  })

export const useDeleteTodoById = () => {
  const queryClient = useQueryClient()
  const { addHistory } = useTypedDispatch()

  return useMutation({
    mutationFn: (id: string) => apiTodo.remove(id),
    onSuccess: (data) => {
      addHistory({
        action: HistoryAction.Delete,
        boardId: data.boardId,
        id: data.id,
        todoName: data.title,
      });
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    },
  })
}

export const useGetTodoById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todo', id],
    queryFn: () => apiTodo.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


