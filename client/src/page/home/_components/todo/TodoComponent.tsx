import { DialogTodoForm } from "./DialogTodoForm"
import { cn } from "@/lib/utils"
import { DropdownAction } from "./DropdownAction"
import { IconCalendarEvent } from "@tabler/icons-react"
import { dateHelpers } from "@/lib/dateHelpers"
import { Badge } from "@/components/ui/badge"
import { DropdownMove } from "./DropdownMove"
import { useEffect } from "react"

import { useGetTodolist } from "@/ahooks/useTodolist"
import { DropdownActionList } from "../todolist/DropdownActionList"

interface TodoComponentProps {
  boardId: string
}

const TodoComponent = ({ boardId }: TodoComponentProps) => {
  const getResult = useGetTodolist({
    enabled: true,

    params: {
      boardId,
      limit: "120",
    },
  })

  const { data: todolistData, refetch } = getResult

  useEffect(() => {
    refetch()
  }, [refetch, boardId])
  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        )}
      >
        {todolistData?.todolists.map((todolist) => (
          <div key={todolist.id} className="paper-sharp">
            <div
              className={cn(
                "p-1 flex justify-between items-center",
                "border-t border-b border-black "
              )}
            >
              <p className="text-h3">{todolist.title}</p>
              <div className="flex gap-3">
                <p className="text-h3">{todolist.todos.length}</p>
                <DropdownActionList todolistId={todolist.id} />
              </div>
            </div>
            <div className="my-4 flex flex-col">
              <DialogTodoForm todolistId={todolist.id} />
            </div>
            <div className="space-y-3 mt-4">
              {todolist?.todos.map((todo) => (
                <div key={todo.id} className="paper-rounded space-y-3">
                  <div className="flex justify-between">
                    <p>{todo.title}</p>
                    <DropdownAction
                      todo={todo}
                      todolistId={todolist.id}
                      todolists={todolistData?.todolists}
                    />
                  </div>
                  <p className="line-clamp-2">{todo.description}</p>
                  <div className="flex gap-3">
                    <IconCalendarEvent />
                    <span>{dateHelpers.getDayMonthYear(todo.deadline)}</span>
                  </div>
                  <Badge variant="muted">{todo.priority}</Badge>
                  <DropdownMove
                    todo={todo}
                    todolists={todolistData?.todolists}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoComponent
