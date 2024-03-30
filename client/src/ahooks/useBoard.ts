import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  IBoardSchema,
  QueryBoardParams,
  apiBoard,
} from '@/actions/client/boardAction'


export const useCreateBoard = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiBoard.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board'],
      })
    },
  })
}

export const useUpdateBoard = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IBoardSchema) => apiBoard.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['board', id],
      // })
    },
  })
}

export const useGetBoard = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryBoardParams
}) =>
  useQuery({
    queryKey: ['board', 'all'],
    queryFn: () => apiBoard.getAll(params ?? {}),
    enabled,
  })

export const useGetBoardTitle = ({
  enabled = true,
}: {
  enabled?: boolean
}) =>
  useQuery({
    queryKey: ['board'],
    queryFn: () => apiBoard.boardTitles(),
    enabled,
  })

export const useDeleteBoardById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiBoard.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board']
      });
    },
  });
};

export const useGetBoardById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['board', id],
    queryFn: () => apiBoard.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['board', id],
      })
    }
  }, [isSuccess, queryClient, id])

  return query
}


