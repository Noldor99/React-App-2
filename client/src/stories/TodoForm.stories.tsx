/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryFn } from "@storybook/react"
import {
  TodoForm,
  TodoFormPropsType,
} from "@/page/home/_components/todo/TodoForm"
import { TodoPriority, TodoVariant } from "@/types/todo"

import store from "@/store"
import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { FC } from "react"

const ReduxDecorator: FC = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Story />
    </Provider>
  </QueryClientProvider>
)

export default {
  title: "Components/TodoForm",
  component: TodoForm,
  decorators: [ReduxDecorator],
} as Meta

const Template: StoryFn<TodoFormPropsType> = (args) => (
  <div className="container-sm py-2">
    <TodoForm {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  handleClose: () => {},
  boardId: "your_board_id_here",
}

export const EditTodo = Template.bind({})
EditTodo.args = {
  todo: {
    id: "todo_id_here",
    title: "Sample Todo",
    description: "Sample todo description",
    priority: TodoPriority.high,
    variant: TodoVariant.progress,
    deadline: new Date("2024-04-08"),
    createdAt: new Date(),
    boardId: "your_board_id_here",
  },
  handleClose: () => {},
  boardId: "your_board_id_here",
}
