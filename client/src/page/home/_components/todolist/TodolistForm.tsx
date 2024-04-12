"use client"

import { useCreateTodolist, useUpdateTodolist } from "@/ahooks/useTodolist"

import { FC } from "react"
import { useForm } from "react-hook-form"

import { AxiosError } from "axios"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  ITodolistSchema,
  TodolistSchema,
} from "@/actions/client/todolistAction"
import { ITodolist } from "@/types/todolist"

type TodolistFormPropsType = {
  Todolist?: ITodolist
  handleClose: () => void
  boardId?: string
}

export const TodolistForm: FC<TodolistFormPropsType> = (
  props: TodolistFormPropsType
) => {
  const { Todolist, handleClose, boardId } = props

  const form = useForm<ITodolistSchema>({
    mode: "onChange",
    resolver: zodResolver(TodolistSchema),
    defaultValues: {
      title: Todolist?.title || "",
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createTodolist, isPending: pendingTodolist } =
    useCreateTodolist()
  const { mutateAsync: updateTodolist, isPending: pendingUpdate } =
    useUpdateTodolist(Todolist?.id || "")
  const isPending = pendingTodolist || pendingUpdate

  function onSubmit(data: ITodolistSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: ITodolistSchema = Object.keys(dirtyFields).reduce(
      (result, key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        result[key as keyof ITodolistSchema] =
          data[key as keyof ITodolistSchema]

        return result
      },
      {} as ITodolistSchema
    )
    changedFields.boardId = boardId
    const mutation = Todolist ? updateTodolist : createTodolist

    mutation(changedFields, {
      onSuccess: () => {
        handleClose()
        toast({
          title: "Success",
          description: `${Todolist ? "Update" : "Create"} success`,
        })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })
            ?.message || "Unknown error"

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="title" placeholder="Title" />
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <Button variant="default_out" onClick={handleClose}>
              Cansel
            </Button>
            <Button
              type="submit"
              className=""
              disabled={
                isPending || !formState.isValid
                  ? true
                  : formState.isDirty
                  ? false
                  : true
              }
            >
              Save Todolist
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
