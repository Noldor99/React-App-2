
import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  ITodolistSchema,
  QueryTodolistParams,
  apiTodolist,
} from '@/actions/client/todolistAction'


export const useCreateTodolist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiTodolist.create,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['todolist'],
      })
    },
  })
}

export const useUpdateTodolist = (id: string) => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<ITodolistSchema>) => apiTodolist.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolist'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['todolist', id],
      // })
    },
  })
}

export const useGetTodolist = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryTodolistParams
}) =>
  useQuery({
    queryKey: ['todolist'],
    queryFn: () => apiTodolist.getAll(params ?? {}),
    enabled,
  })

export const useDeleteTodolistById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiTodolist.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolist'],
      })
    },
  })
}

export const useGetTodolistById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todolist', id],
    queryFn: () => apiTodolist.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['todolist'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


