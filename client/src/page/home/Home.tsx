import { useGetBoard } from "@/ahooks/useBoard"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { DialogBoardForm } from "./_components/DialogBoardForm"
import TodoComponent from "./_components/todo/TodoComponent"
import { DrawerHisrory } from "./_components/Draver"

import { useNavigate } from "react-router-dom"
import { DropdownActionBoard } from "./_components/DropdownActionBoard"
import BoardSearch from "./_components/BoardSearch"

const Home = () => {
  const searchParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const titles = searchParams.get("titles")

  const getResult = useGetBoard({
    enabled: true,
    params: {
      limit: "120",
      titles: titles ? titles : undefined,
    },
  })

  const { data: boardData, refetch } = getResult

  useEffect(() => {
    if (titles) {
      refetch()
    }
  }, [refetch, titles, navigate])

  return (
    <div className="container">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <DialogBoardForm />
      </div>
      <BoardSearch />
      <div className={cn("flex flex-col gap-6 mt-6")}>
        {titles &&
          boardData?.boards.map((item) => (
            <div key={item.id} className="sm:paper-sharp">
              <div className="flex justify-between mb-5 paper-rounded">
                <p className="text-h2">{item.title}</p>
                <div className="flex justify-center items-center gap-4">
                  <DrawerHisrory boardId={item.id} />

                  <DropdownActionBoard boardId={item.id} />
                </div>
              </div>
              <TodoComponent boardId={item.id} />
            </div>
          ))}
      </div>
      {boardData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
    </div>
  )
}

export default Home
