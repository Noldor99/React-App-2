"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import DialogDelete from "@/components/DialogDelete"
import { DialogTodolistForm } from "./DialogTodolistForm"
import { useDeleteTodolistById } from "@/ahooks/useTodolist"

interface DropdownActionProps {
  todolistId: string
}

export function DropdownActionList({ todolistId }: DropdownActionProps) {
  const [openmodal, setOpenModal] = useState(false)

  const handleOpenModalChangeModal = () => {
    setOpenModal(!openmodal)
  }

  const { mutateAsync: deleteTodolist } = useDeleteTodolistById()

  return (
    <DropdownMenu open={openmodal} onOpenChange={handleOpenModalChangeModal}>
      <DropdownMenuTrigger asChild>
        <Button variant="black_out" size="icon">
          <IconDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel onClick={() => setOpenModal(true)}>
          <DialogTodolistForm id={todolistId}>
            <div className="flex gap-5">
              <IconEdit />
              <p className="text-lg1">Edit</p>
            </div>
          </DialogTodolistForm>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <DialogDelete
            onClick={() => deleteTodolist(todolistId)}
            nameDelete="board"
          >
            <div className="flex gap-5">
              <IconTrash />
              <p className="text-lg1">Delete</p>
            </div>
          </DialogDelete>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
