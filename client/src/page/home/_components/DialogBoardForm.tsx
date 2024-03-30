"use client"

import { useGetBoardById } from "@/ahooks/useBoard"

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

import { BoardForm } from "./BoardForm"

interface DialogRoomProps {
  id?: string | undefined
  children?: ReactNode
}

export function DialogBoardForm({ id, children }: DialogRoomProps) {
  const { data: board, isFetched } = useGetBoardById(id!)
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
            {id ? "Edit board" : "Create new board"}
          </DialogTitle>
        </DialogHeader>
        {id ? (
          isFetched && (
            <BoardForm board={board} handleClose={handleOpenChange} />
          )
        ) : (
          <BoardForm handleClose={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
