import { useLocation, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import Line from "@/components/ui/line"
import { IBoardTitle } from "@/types/board"
import { useGetBoardTitle } from "@/ahooks/useBoard"

const BoardSearch = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const getResult = useGetBoardTitle({
    enabled: true,
  })

  const { data: boardTitleData, refetch } = getResult

  useEffect(() => {
    refetch()
  }, [refetch])

  const [activeBoards, setActiveBoards] = useState<IBoardTitle[] | undefined>(
    undefined
  )

  useEffect(() => {
    if (activeBoards === undefined) return
    if (activeBoards.length === 0) {
      navigate(`${pathname}`)
    } else {
      const boardsParam = activeBoards.map((board) => board.title).join(",")
      navigate(`${pathname}?titles=${boardsParam}`)
    }
  }, [activeBoards])

  return (
    <div className="paper-sharp mt-5">
      <div className="mb-5 flex flex-wrap gap-4 paper-rounded">
        {boardTitleData?.map((board) => (
          <Badge
            variant="muted"
            key={board.id}
            className="flex gap-4"
            onClick={() => {
              if (
                !activeBoards ||
                !activeBoards.some((t) => t.id === board.id)
              ) {
                setActiveBoards(
                  activeBoards ? [...activeBoards, board] : [board]
                )
              }
            }}
          >
            <div>{board.title}</div>
          </Badge>
        ))}
      </div>
      {activeBoards && activeBoards?.length > 0 && (
        <>
          <Line />
          <div className="mt-5 flex flex-wrap gap-4 paper-rounded">
            {activeBoards?.map((board) => (
              <Badge
                variant="muted"
                key={board.id}
                className="flex gap-4"
                onClick={() =>
                  setActiveBoards(
                    activeBoards
                      ? activeBoards.filter((t) => t.id !== board.id)
                      : []
                  )
                }
              >
                <div>{board.title}</div>
              </Badge>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BoardSearch
