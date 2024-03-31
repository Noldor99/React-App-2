import { Meta, StoryFn } from "@storybook/react"
import {
  DialogBoardForm,
  DialogBoardFormProps,
} from "@/page/home/_components/DialogBoardForm"
import { queryClient } from "@/lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { FC } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReduxDecorator: FC = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
)

export default {
  title: "Components/DialogBoardForm",
  component: DialogBoardForm,
  decorators: [ReduxDecorator],
} as Meta

const Template: StoryFn<DialogBoardFormProps> = (args) => (
  <DialogBoardForm {...args} />
)

export const CreateNewBoard = Template.bind({})
CreateNewBoard.args = {}

export const EditBoard = Template.bind({})
EditBoard.args = {
  id: "your_board_id_here",
}
