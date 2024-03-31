import { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@/components/ui/badge"
import "../index.css"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      options: ["muted", "white", "primary", "destructive"],
      control: {
        type: "inline-radio",
      },
    },
    onClick: { action: "clicked" },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "muted",
    children: "Badge",
  },
}
