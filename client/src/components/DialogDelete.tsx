import { ReactNode } from "react"

import { IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DialogDeleteProps {
  nameDelete: string
  onClick: () => void
  children?: ReactNode
}

const DialogDelete = ({ nameDelete, onClick, children }: DialogDeleteProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="p-2" variant={"destructive"}>
            <IconTrash />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-s mb-6 text-center font-normal leading-[2rem]">
            Are you sure you want to delete this {nameDelete}?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-around  gap-[200px]">
          <DialogClose
            onClick={onClick}
            className="bg-destructive text-white shadow-sm hover:opacity-[65%] py-2 px-4"
          >
            Delete
          </DialogClose>
          <DialogClose className="bg-primary text-white shadow hover:opacity-[65%] px-4">
            Cancel
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete
