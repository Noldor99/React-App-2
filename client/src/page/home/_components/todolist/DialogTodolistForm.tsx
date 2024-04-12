"use client"

import { useGetTodolistById } from "@/ahooks/useTodolist"

import { ReactNode, useState } from "react"

import { IconEdit, IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { TodolistForm } from "./TodolistForm"

interface DialogRoomProps {
  id?: string | undefined
  boardId?: string
  children?: ReactNode
}

export function DialogTodolistForm({ id, boardId, children }: DialogRoomProps) {
  const { data: Todolist, isFetched } = useGetTodolistById(id!)
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {id ? (
          children ? (
            children
          ) : (
            <Button className="w-full" variant="black_out">
              <IconEdit />
            </Button>
          )
        ) : (
          <Button variant="black_out">
            <IconPlus className="mr-2" />
            Add todo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-h2 mb-3 text-center font-normal">
            {id ? "Edit Todolist" : "Create new Todolist"}
          </DialogTitle>
        </DialogHeader>
        {id ? (
          isFetched && (
            <TodolistForm
              boardId={boardId}
              Todolist={Todolist}
              handleClose={handleOpenChange}
            />
          )
        ) : (
          <TodolistForm boardId={boardId} handleClose={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
