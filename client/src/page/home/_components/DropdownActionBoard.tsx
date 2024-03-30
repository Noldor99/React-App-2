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
import { useDeleteBoardById } from "@/ahooks/useBoard"
import { DialogBoardForm } from "./DialogBoardForm"
import DialogDelete from "@/components/DialogDelete"

interface DropdownActionProps {
  boardId: string
}

export function DropdownActionBoard({ boardId }: DropdownActionProps) {
  const [openmodal, setOpenModal] = useState(false)

  const handleOpenModalChangeModal = () => {
    setOpenModal(!openmodal)
  }

  const { mutateAsync: deleteBoard } = useDeleteBoardById()

  return (
    <DropdownMenu open={openmodal} onOpenChange={handleOpenModalChangeModal}>
      <DropdownMenuTrigger asChild>
        <Button variant="black_out" size="icon">
          <IconDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel onClick={() => setOpenModal(true)}>
          <DialogBoardForm id={boardId}>
            <div className="flex gap-5">
              <IconEdit />
              <p className="text-lg1">Edit</p>
            </div>
          </DialogBoardForm>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <DialogDelete onClick={() => deleteBoard(boardId)} nameDelete="board">
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
