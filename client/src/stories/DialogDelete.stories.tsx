import { Meta, StoryFn } from "@storybook/react"
import DialogDelete, { DialogDeleteProps } from "@/components/DialogDelete"

export default {
  title: "Components/DialogDelete",
  component: DialogDelete,
} as Meta

const Template: StoryFn<DialogDeleteProps> = (args) => (
  <DialogDelete {...args} />
)

export const Default = Template.bind({})
Default.args = {
  nameDelete: "item",
  onClick: () => null,
}
